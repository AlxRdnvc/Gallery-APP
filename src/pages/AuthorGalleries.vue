<template>
    <div class="container">
        <h1>Galleries:</h1>
        <div class="row">
            <div class="card-style card col-xs-3" v-for="(gallery, key) in galleries" :key="key">
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
        }
    },
    created() {
        galleryService.getAuthorGalleries(this.$route.params.id)
        .then(response => {
            this.galleries = response.data
        })
        .catch(error => {
                this.error = error.response.data.error
        })
    }
}
</script>
