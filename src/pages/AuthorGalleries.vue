<template>
    <div class="container">
        <div v-if="errors" class="alert alert-danger row" role="alert">
          <strong>{{errors}}</strong>
        </div>
        <h3>Galleries by: {{galleries[0].user.first_name}} {{galleries[0].user.last_name}}</h3>
        <div class="row">
            <div class="card-style card col-xs-3" v-for="(gallery, index) in galleries" :key="index">
                <img class="card-img-top" :src="gallery.images[0].image_url" alt="Card image cap">
                <div class="card-body">
                    <router-link :to="{ name: 'single-gallery', params:{id: gallery.id}}">
                        <h5 class="card-title">{{gallery.gallery_name}}</h5>
                    </router-link>
                    <p class="card-text"><i>created at:</i> {{gallery.created_at}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { galleryService } from '../services/GalleryService.js'

export default {
    name: 'author-galleries',
    data() {
        return {
            galleries: [],
            errors: ''
        }
    },
    created() {
        galleryService.getAuthorGalleries(this.$route.params.id)
        .then(response => {
            this.galleries = response.data
        })
        .catch(error => {
                this.errors = error.response.data.error
        })
    }
}
</script>
<style>
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

