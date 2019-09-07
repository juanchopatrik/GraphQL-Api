'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')


module.exports = {
  getCourses: async () => {// es un query general que no recibe parametros
    let db
    let courses = []

    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()//busca los parametros y los convierte en arrays
    } catch (error) {
      errorHandler(error)
    }

    return courses//trae un arreglo general
  },
  getCourse: async (root, {//recibe de parametro el id
    id
  }) => {
    let db
    let course

    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({//encuentra por id y la función objectId que recibe de paramnetro
        _id: ObjectID(id)
      })
    } catch (error) {
      console.error(error)
    }

    return course
  },
  getPeople: async () => {
    let db
    let students = []

    try {
      db = await connectDb()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return students
  },
  getPerson: async (root, { id}) => {
    let db
    let student

    try {
      db = await connectDb()
      student = await db.collection('students').findOne({
        _id: ObjectID(id)
      })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  searchItems: async (root, {
    keyword//es lo que vamos a buscar en los tres conjuntos
  }) => {
    let db
    let items
    let courses
    let people

    try {
      db = await connectDb()
      courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()// se le asigna  test el keyword y lo convertimos en un array
      people = await db.collection('students').find({$text: { $search: keyword}}).toArray()
      items = [...courses, ...people]//deconstruimos
    } catch (error) {
      errorHandler(error)
    }

    return items// ejecuta una busqueda global en todo el sistema
  }
}