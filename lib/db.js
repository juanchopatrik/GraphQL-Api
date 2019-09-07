'use strict'
const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env //dotenv pone estas variable en el archivo de configuración

//const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
//mongodb+srv://PatrikPlatziUser:<password>@estudiante-fpt6o.mongodb.net/test
//const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`//estamos usando la maquina como servidor
//const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}`

let connection

async function connectDB () {
  if (connection) return connection//si ya se esta conectado no volver a conectar

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })//conectarse a mongo, este es el constructor del mongo
    connection = client.db(DB_NAME)//nos conectamos directamente a la directorio
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection//ahora si generamos la conexión
}

module.exports = connectDB