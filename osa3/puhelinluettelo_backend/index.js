const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('content', request => {
    if (request.body.name) {
        return JSON.stringify(request.body)
    } else {return}
})

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())


let persons = 
[   
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (person.name && person.number) {
        if (persons.map(p => p.name).includes(person.name) === false) {
            person.id = Math.random() * 100
            persons = persons.concat(person)
            response.json(person)
        } else {
            return response.status(400).json({
                error: "name must be unqiue"
            })
        }
    } else {
        console.log(person)
        return response.status(400).json({
            error: "name or number missing"
        })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})