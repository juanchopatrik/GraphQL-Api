'use strict'

const courses = [
  {
    _id: 'anyid',
    title: 'Mi titulo',
    teacher: 'Mi profesor',
    description: 'una descripcion',
    topic: 'programcion'
  },
  {
    _id: 'anyid2',
    title: 'Mi titulo 2',
    teacher: 'Mi profesor',
    description: 'una descripcion',
    topic: 'programcion'
  },
  {
    _id: 'anyid3',
    title: 'Mi titulo 3',
    teacher: 'Mi profesor',
    description: 'una descripcion',
    topic: 'programcion'
  }
]

module.exports = {
Query: {/**por executable schema hay que poner que get courses en un query */
    getCourses: () => {/**debe tener el nombre del schema */
    return courses
    },
getCourse: (root, args) => {
  const course = courses.filter(course => course._id === args.id)/**se filtra el curso, se compara el curso 
  que hay en la base de datos con el argumento que llega */
  return course.pop()/**me devuelve solamente el primer elemento */
    }
  }
}

