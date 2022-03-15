import Axios from 'axios'
import {BackendURL } from './constants'


const api =
    Axios.create({
        headers: {
            'Content-Type': 'application/json'
        },
        baseURL: BackendURL,
        withCredentials: true
    })


export default api