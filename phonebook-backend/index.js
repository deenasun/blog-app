const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>hello world!</h1>')
})

app.get('/info', (request, response) => {
    const count = getCount()
    console.log(count)
    const date = new Date()
    response.send(`<p>Phonebook has info for ${count} people<br/>${date}</p>`)
})

const getCount = () => {
    Person.find({}).then(result => {
        return count = console.log(result.length)
    })
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(p => {
        response.json(p)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
        response.status(204).end()
        })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const content = request.body

    if (content.name.length == 0 || content.number.length == 0) {
        return response.status(400).json({ error: 'Name and number can not be empty!' })
    }

    let num = content.id
    if (content.id) {
        num = content.id
    } else {
        num = Math.floor(Math.random() * 100)
    }

    console.log(content)

    const p = new Person({
        id: num,
        name: content.name,
        number: content.number
    })

    p.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => {
            console.log(error._message)
        })
})

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function (request, response) {
    console.log(request.body)
    return JSON.stringify(request.body)
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})