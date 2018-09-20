<template>
<div>
    <div class="text-center">
        <h2>Create new gallery</h2>
    </div>
    <form @submit.prevent="submit">
        <div class="form-group row">
            <div class="col-8">
                <input id="gallery_name" name="gallery_name" placeholder="Gallery title..." type="text" class="form-control here" v-model="newGallery.gallery_name" required autofocus>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-8">
                <textarea id="description" name="description" cols="40" rows="5"  placeholder="Gallery descritption..." class="form-control" v-model="newGallery.description"></textarea>
            </div>
        </div>

        <div class="form-group" v-for="(n, index) in input_number" :key="index">
            <label id="image_url" name="image_url" class="control-label col-xs-4">Image {{ index+1 }}:</label> 
            <input id="image_url" name="image_url" v-model='newGallery.images[index]' placeholder="Image URL" required>
            <button v-if="input_number > 1" @click="deleteRow(index)">Delete</button>
        </div>

        <a class="btn btn-secondary" @click="addRow">Add image url</a>

        <div class="form-group row">
            <div class="offset-4 col-8">
                <button name="submit" type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </form>
</div>
</template>
<script>
import {galleryService} from "../services/GalleryService";

export default {
    name: 'create-gallery',
    data() {
        return {
            newGallery: {
                images: []
            },
            input_number: 1
        }
    },
    methods: {
        addRow() {
                this.input_number++
            },
        deleteRow(index) {
                this.input_number--
            },
        submit() {
            galleryService.addGallery(this.newGallery)
            .then((response) => {
                this.$router.push('my-galleries')
            })
            .catch(error => {
            this.error = error.response.data.error
            })
        }
    }
}
</script>
