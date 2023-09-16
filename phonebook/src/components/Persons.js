import React from "react"
import PersonLine from "./PersonLine"

const Persons = ({persons, search, handleDelete}) => {
    const match = persons.filter(person => person.name.toLowerCase().includes(search.toLocaleLowerCase()))
    
    return (
        match.map((person) => {
            return <PersonLine key={person.id} person={person}  handleDelete={handleDelete}/> }
        )
    )
}


export default Persons