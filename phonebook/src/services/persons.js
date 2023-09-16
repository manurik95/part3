import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"

const getAll =() => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create =(newObject) =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res=>res.data)
}

const updateNumber = (id, updatedNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedNumber)
    return request.then(res=> res.data)

}


export {
    getAll,
    create,
    deletePerson,
    updateNumber
  };