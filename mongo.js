const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dbUser:${password}@cluster0.znefgtb.mongodb.net/Persons?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Persons = mongoose.model('persons', personSchema)

mongoose.connection.on('connected', () => {

	if (process.argv.length===3) {
		console.log('phonebook:')
		Persons.find({}).then(result => {
			result.forEach(pers => {
				console.log(pers.name, pers.number)
			})
			mongoose.connection.close()
		})


	} else if (process.argv.length===5) {
		const person = new Persons({
			name: process.argv[3],
			number: process.argv[4],
		})

		person.save().then(() => {
			console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
			mongoose.connection.close()
		})
	}


})





