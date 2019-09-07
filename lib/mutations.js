'use strict'

const connectDb = require('./db')//importarmos la base de datos
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')


module.exports = {
  createCourse: async (root, { input }) => {//usamos el input como destructuring
    const defaults = {//defaults información que no es obligatoria
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)//se le agrega a los datos obligatorios los datos no obligatorios
    let db
    let course

    try {
      db = await connectDb()//conectamos a la base de datos
      course = await db.collection('courses').insertOne(newCourse) //new course es el input
      newCourse._id = course.insertedId//a los datos sumamos el Id insertado, que es el ultimo con InstertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse//en este esta toda la información
  },
  createPerson: async (root, { input }) => {
    let db
    let student

    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return input
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course

    try {
      db = await connectDb()
      await db.collection('courses').updateOne({ _id: ObjectID(_id) },
        { $set: input })
      course = await db.collection('courses').findOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  editPerson: async (root, { _id, input }) => {//recibe el id que se quiere modificar y la información
    let db
    let student

    try {
      db = await connectDb()
      await db.collection('students').updateOne( { _id: ObjectID(_id) },{ $set: input })//se actualiza por el id y se setea con el input
      student = await db.collection('students').findOne({ _id: ObjectID(_id)})//nueva información
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({//se recupera el curso
        _id: ObjectID(courseID)
      })
      person = await db.collection('students').findOne({//se recupera la persona
        _id: ObjectID(personID)
      })

      if (!course || !person) throw new Error('La Persona o el Curso no existe')

      await db.collection('courses').updateOne(// si existen se hace una actualización
        { _id: ObjectID(courseID) },//el id del curso
        { $addToSet: { people: ObjectID(personID) } }// este es el operador add to set busca si hay un arreglo en el campo peaople y ponemos el id del estudiante
      )
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db

    try {
      db = await connectDb()
      await db.collection('courses').deleteOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }

    return true
  },
  deleteStudent: async (root, {
    _id
  }) => {
    let db

    try {
      db = await connectDb()
      await db.collection('student').deleteOne({
        _id: ObjectID(_id)
      })
    } catch (error) {
      errorHandler(error)
    }

    return true
  }
}
