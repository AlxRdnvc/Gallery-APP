<template>
    <div class="container-fluid">
        <div v-if="errors" class="alert alert-danger row" role="alert">
          <strong>{{errors}}</strong>
        </div>
        <div v-if="loadedGalleries.length != 0">
            <div v-for="(gallery, index) in loadedGalleries" :key="index" class="card">
                <img class="card-img-top" :src="gallery.images[0].image_url" alt="Card image cap">
                <div class="card-body">
                    <h4><router-link :to="{name: 'single-gallery', params: {id: gallery.id}}">{{gallery.gallery_name}}</router-link></h4>
                    <p><router-link  :to="{name: 'author-galleries', params: {id: gallery.user.id}}">{{ gallery.user.first_name}} {{ gallery.user.last_name}}</router-link></p>
                    <p>{{ gallery.created_at}}</p>
                </div>
            </div>
            <div>
                <button v-if="galleries.next_page_url" @click="getNextPage" class="btn btn-primaru" type="button">Load more galleries</button>
            </div>
        </div>
        <div v-else>
            <p>There are no galleries...</p>
        </div>
    </div>
</template>
<script>
import { galleryService } from '../services/GalleryService.js'

export default {
    name: 'galleries',
    data() {
        return {
            galleries: [],
            loadedGalleries: [],
            errors: '',
            nextPage: ''
        }
    },
    created() {
        galleryService.getAllGalleries()
        .then(response => {
            this.galleries = response.data
            this.loadedGalleries = response.data.data
        })
        .catch(error => {
                this.errors = error.response.data.errors
            
        })
    },
    methods: {
        getNextPage(){
            var nextPage = this.galleries.next_page_url
            galleryService.getNextPage(nextPage)
            .then(response => {
                this.galleries = response.data
                this.loadedGalleries = this.loadedGalleries.concat(this.galleries.data)
            })  
        }
    }
}
</script>
<style scoped>
.card {
    width: 60%;
    padding: 5px;
    margin: 20px auto;
    box-shadow: 5px 5px 30px;
}
.card-body {
    background-color: #e4e4e4;
    line-height: 0.2rem;
    color: #444e60;
    font-size: 0.8rem;
    text-align: center
}
.card-body a {
    color: #444e60;
}
</style>

