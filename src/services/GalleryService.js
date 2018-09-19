import axios from 'axios'

export default class GalleryService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/auth/'
    }

    getAllGalleries(){
        return axios.get('galleries');
    }

    getSingleGallery(id){
        return axios.get(`galleries/${id}`);
    }

    getAuthorGalleries(id){
        return axios.get(`authors/${id}`)
    }

    addGallery (gallery) {
        return axios.post('galleries', gallery)
    }

    getUserGalleries(id){
        return axios.get(`my-galleries`)
    }

}

export const galleryService = new GalleryService();
