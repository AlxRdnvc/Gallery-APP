<template>
    <div class="container">
        <div class="card text-center w-100">
            <div class="card-header">
                <p>created by: <i><b>{{gallery.user.first_name}} {{gallery.user.last_name}}</b></i></p>
            </div>
            <div class="card-body">
                <h3 class="card-title">{{gallery.gallery_name}}</h3>
                <p class="card-text">{{gallery.description}}</p>
                <div v-for="(image, key) in gallery.images" :key="key">
                    <img style="margin-bottom: 20px;" class="card-img-top" :src="image.image_url" alt="Card image cap"> 
                </div>
            </div><br>
        </div>
    </div>
</template>
<script>
import {galleryService} from "../services/GalleryService";

export default {
    name: 'single-gallery',
    data() {
        return {
            gallery: [],
        }
    },
    created() {
        galleryService.getSingleGallery(this.$route.params.id)
        .then(response => {
            this.gallery = response.data
        })
        .catch(error => {
                this.error = error.response.data.error
        })
    }
}
</script>