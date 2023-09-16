require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Persons = require('./models/person')

const app = express()

app.use(cors({
	origin: ['http://localhost:3000', 'https://part3-r27y.onrender.com']
}))

app.use(express.static('build'))
app.use(express.json())


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms :body '))


const errorHandler = (err, req, res, next) => {
	console.error(err.message)

	if(err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ err: err.message })
	}

	next(err)
}

app.use(errorHandler)




app.get('/info' , async (req, res) => {

	try {
		const count = await Persons.countDocuments({})
		const currentTime = new Date()
		const htmlres = `<p> Phonebook has info for ${count} people</p>
                            <p> ${currentTime} </p>`
		res.send(htmlres)
	} catch (err) {
		console.error('Error', err)
		res.status(500).send('Internal Server Error')
	}
})


app.get('/api/persons', (req,res) => {
	Persons.find({}).then(persons => {
		res.json(persons)
	})
})




app.get('/api/persons/:id', (req,res, next) => {
	Persons.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person)
			} else {
				res.status(404).end()
			}
		})
		.catch(err => next(err) )
})


app.delete('/api/persons/:id', (req,res,next) => {
	Persons.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(err => next(err))
})


// new Person
app.post('/api/persons', (req,res, next) => {
	const body = req.body

	//  if (!body.name || !body.number) {
	//      return res.status(400).json({error: "name or number missing"})
	// }

	const person = new Persons({
		name: body.name,
		number: body.number
	})

	person.save().then(savedPerson => {
		res.json(savedPerson)
	})
		.catch(err => next(err))
})


app.put('/api/persons/:id', async (req,res,next) => {
	const { name, number } = req.body

	try {
		const person = await Persons.findById(req.params.id)

		if (!person) {
			return res.status(404).json({ error: 'Person not found' })
		}

		person.name = name
		person.number = number

		// Validieren Sie das Dokument
		await person.validate()

		// Speichern Sie das Dokument
		const updatedPerson = await person.save()
		res.json(updatedPerson)
	} catch (error) {
		next(error)
	}
})




const PORT =  process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
