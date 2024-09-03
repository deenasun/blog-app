import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteSomething = (id) => {
    axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log('User deleted successfully:', response.data);
        })
}

export default {getAll, create, update, deleteSomething}