const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstackopen:${password}@phonebookdata.8tgvcah.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length > 3) {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log('Phonebook')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}