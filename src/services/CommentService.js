import axios from 'axios'

export default class Comment {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/auth/'
  }

//   addComment (comment) {
//     return axios.post('comments', comment)
//   }
  
}

export const comments = new Comment()
