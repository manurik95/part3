import React from "react"


const PersonLine = ({person, handleDelete}) => {
    return(
        <p>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete </button>
        </p>
    )
}

export default PersonLine