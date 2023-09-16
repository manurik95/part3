import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getAll, create, deletePerson, updateNumber } from './services/persons'
import Notification from './components/Notification'

const App = () => {

  useEffect(() => {
      getAll().then(personsData => {
      setPersons(personsData)
    })
  }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] =useState(null)
  const [messageType, setMessageType] = useState("")


  const handleChange = (e) => {
    setNewName(e.target.value)
  }
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }




  const handleSubmit = (e) => {
    e.preventDefault()

    const oldContact = persons.find(person => person.name === newName)
    const changedNumber = { ...oldContact, number: newNumber }

    if (oldContact) {
      const confirmation = window.confirm(`Do you really want to change the number of ${oldContact.name}?`);
  
      if (confirmation) {
        updateNumber(oldContact.id, changedNumber)
          .then(newData => {
            setPersons(persons.map((p) => {
              return p.id === oldContact.id ? newData : p
            }));
            setNewName("");
            setNewNumber("");
            setMessageType("success");
            setMessage("Number of " + newData.name + " has been updated");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessageType("error");
            setMessage("no real number");
            getAll().then(personsData => {
              setPersons(personsData);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            });
          });
        }


      }  else if (persons.some(person => person.number=== newNumber)) {
          alert(`The number ${newNumber} is already added to phonebook`)
    


      } else {
          const highestId = persons.reduce((highest, person) => {
            return person.id > highest ? person.id : highest
          },0)
          const personObject = {
            name: newName,
            number: newNumber,
            id: highestId +1
          }
          create(personObject)
            .then(newData => {
              setPersons(persons.concat(newData) )
              setNewName("")
              setNewNumber("")
              setMessageType("success")
              setMessage("Added "+ newData.name)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch((error) => {
              setMessageType("error");
              setMessage("No real Name or no real Number");
              getAll().then(personsData => {
                setPersons(personsData);
                setTimeout(() => {
                  setMessage(null);
                }, 5000);
              });
            });
      }   
    }
  
          
    
  const handleDelete = (id) => {
    window.confirm("Do you really want to delete this contact?") &&
      deletePerson(id).then(() => {
        setPersons(persons.filter(pers => pers.id !== id))
    })
  }


  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} messageType = {messageType}/>
      
      <Filter handleSearch = {handleSearch}/>

      <h3>add a new contact</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleChange={handleChange} handleSubmit={handleSubmit} handleChangeNumber={handleChangeNumber} />

      <h3>Numbers</h3>
      <Persons persons ={persons} search={search} handleDelete={handleDelete}/>    
    </div>
  )
}
//
export default App