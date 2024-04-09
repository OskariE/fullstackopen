import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
}

const getOne = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

export default {
    getAll, getOne
}