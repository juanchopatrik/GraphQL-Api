'use strict'

const { buildSchema } = require('graphql')/** build schcema nos permite construir el
squema */
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
const schema = buildSchema(
  readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),/**lee como esquema graphql */
    'utf-8'
  )
)/** query me permite ejecutar que campos exactos quiero */

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers, /** se ingresan los resolvers */
  graphiql: true/** es el entorno de desarrollo de graphql */
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
