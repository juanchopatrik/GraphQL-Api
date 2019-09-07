'use strict'

require('dotenv').config()

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')// poner en modo producción
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')//se usa para abrir archivos de forma sincrona
const { join } = require('path')//para abrir archivos con la ruta
const resolvers = require('./lib/resolvers')//los resolvers son los que manejan las interaciónes

const app = express()//se inicia servidor
const port = process.env.port || 3000//se escoge el puerto
const isDev = process.env.NODE_ENV !== 'production'//si el servidor no arranca en modo producción

// definiendo el esquema
const typeDefs = readFileSync(//como se va a abrir el eschema
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })//

app.use(cors())

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev// solo hay graphiql si estamos en modo desarrollo
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})