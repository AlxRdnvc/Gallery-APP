import axios from 'axios'

export default class AuthService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/auth/'
        this.setAuthorizationHeader()
    }
    logout() {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }
    login(email, password) {
        return axios.post('login', {
        email, password
        }).then((response) => {
        // console.log(response.data.access_token)
        window.localStorage.setItem('token', response.data.access_token)
        window.localStorage.setItem('userId', response.data.userId)
        this.setAuthorizationHeader()
        })
    }
    setAuthorizationHeader() {
        const token = window.localStorage.getItem('token')
        const user_id = localStorage.getItem('userId')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    getUserId(){
        return localStorage.getItem('userId')
    }

    isAuthenticated() {
        return !!localStorage.getItem('token')
    }

    addUser(user) {
        return axios.post('register', user)
    }
}
export const authService = new AuthService()
