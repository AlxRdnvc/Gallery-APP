<template>
<div class="wrapper">
    <div class="form-wrapper">
        <h2>Create new gallery</h2>
        <form @submit.prevent="submit">
            <div class="form-group row">
                <div class="form-fields">
                    <input id="gallery_name" name="gallery_name" placeholder="Gallery title..." type="text" class="form-control here" v-model="newGallery.gallery_name">
                </div>
            </div>
            <div class="form-group row">
                <div class="form-fields">
                    <textarea id="description" name="description" cols="40" rows="5"  placeholder="Gallery descritption..." v-model="newGallery.description"></textarea>
                </div>
            </div>

            <div class="form-group" v-for="(n, index) in input_number" :key="index">
                <label id="image_url" name="image_url" class="control-label col-xs-4">Image {{ index+1 }}:</label> 
                <input id="image_url" name="image_url" v-model='newGallery.images[index]' placeholder="Image URL" required>
                <button v-if="input_number > 1" @click="deleteRow(index)">Delete</button>
            </div>
            <div class="form-fields">
                <button class="btn btn-secondary" @click="addRow">Add image url</button>
            <div class="form-fields">

            <div class="form-group row">
                <div class="offset-4 col-8">
                    <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
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
                this.$router.push('galleries')
            })
            .catch(error => {
            this.error = error.response.data.error
            })
        }
    }
}
</script>
