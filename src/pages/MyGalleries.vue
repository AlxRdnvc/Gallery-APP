<template>
    <div class="container">
        <h1>Galleries</h1>
        <div v-if="galleries.length != 0">
            <div class="row">
                <div class="card" v-for="(gallery, index) in galleries" :key="index">
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
        <div v-else>
            <p>There are no galleries...</p>
        </div>
    </div>
</template>
<script>
import {galleryService} from "../services/GalleryService";

export default {
    name: 'my-galleries',
    data() {
        return {
            galleries: []
        }
    },
    created() {
        galleryService.getUserGalleries(this.$route.params.id)
        .then(response => {
            this.galleries = response.data
            console.log(this.galleries)
        })
        .catch(error => {
                this.error = error.response.data.error
        })
    }
}
</script>
