const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://oskarie:${password}@puhelinluettelo.r9btjse.mongodb.net/?retryWrites=true&w=majority&appName=puhelinluettelo`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: String,
})

const Person = mongoose.model('Note', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length === 5) {
  person.save().then(
    console.log(`added ${name} number ${number} to phonebook`),
    mongoose.connection.close()
  )
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}