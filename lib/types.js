'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {//nombre del tipo que quiero resover
    people: async ({ people }) => {//quiero resolver el campo people, recibe todo los campos que tiene curso por eso especificamos people
      let db
      let peopleData//donde vamos  aguardar
      let ids
      try {
        db = await connectDb()
        ids = people ? people.map(id => ObjectID(id)) : []/**si people existe cogemos el id de los peoples y los transformamos en objetId, sino resuelve una arreglo vacio */
        peopleData = ids.length > 0//chequeamos el trmaño del arreglo entonces si hacemos la consulta
          ? await db.collection('students').find({ _id: { $in: ids } }).toArray(): []//va a buscar los estudiandtes que recibamo en people
      } catch (error) {
        errorHandler(error)
      }

      return peopleData
    }
  },
  Person: {// sirve para decir si es de tipo estudiante o monitor
    __resolveType: (person, context, info) => {//resolveType, para decir si es de tipo estudiante o monitor
      if (person.phone) {
        return 'Monitor'
      }

      return 'Student'
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {//
        return 'Course'
      }

      if (item.phone) {
        return 'Monitor'
      }

      return 'Student'
    }
  }
}
