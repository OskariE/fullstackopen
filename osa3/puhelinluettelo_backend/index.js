require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('content', request => {
    if (request.body.name) {
        return JSON.stringify(request.body)
    } else {return}
})

app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())

const errorHandler = ( error, request, response, next ) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(404).send({ error: "malformatted id" })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(people => {
        response.json(people)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        response.send(`<p>Phonebook has info for ${people.length} people</p>
        <p>${new Date}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(result => {
        response.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
