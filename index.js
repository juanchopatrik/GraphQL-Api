'use strict'

const { makeExecutableSchema } = require('graphql-tools')/** mejor forma de invocar schema */
const express = require('express')
const gqlMiddleware = require('express-graphql')/** es el midleware */
const { readFileSync } = require('fs')/**leer el archivo de forma sincrona por que 
siempre debe estar al momento de la carga */
const { join } = require('path')/**para poder direccionar de forma amigable */
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

/* definiendo el esquema, graphql depende el schema como tal para crear consultas el schema
es la estructura de los datos que se pueden consultar y el tipo de dato que es, */
const typeDefs = readFileSync(//este me lleva a schema
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
  )
const schema = makeExecutableSchema({ typeDefs, resolvers })/*typedyfs es la propiedad*/

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers, /** se ingresan los resolvers */
  graphql: true/** es el entorno de desarrollo de graphql */
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
