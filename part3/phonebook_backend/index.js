require('dotenv').config()
const { request } = require('express')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) {
    return req.body
})

app.use(morgan(function (tokens, req, res) {
    const log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms '
    ].join(' ')

    if(req.method === 'POST'){
        return log.concat(JSON.stringify(tokens.body(req,res)))
    }
    return log
}))

app.get('/info', (req,res) => {
    res.send(
        `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
        `
    )
})

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(people => response.json(people))
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => response.json(person))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.floor(Math.random()*1000000)
        : 0
    return maxId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    }

    if (persons.find(person => body.name === person.name)) {
        return response.status(400).json({ 
        error: 'name must be unique' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
    }

    person
        .save()
        .then(savedPerson => response.json(savedPerson))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})