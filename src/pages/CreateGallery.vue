<template>
<div class="form-wrapper">
    <div class="text-center">
        <h5>CREATE NEW GALLERY</h5>
    </div>
    <form @submit.prevent="submit">
        <div class="form-fields">
            <input id="gallery_name" name="gallery_name" placeholder="Gallery title..." type="text" class="form-control here" v-model="newGallery.gallery_name" required autofocus>
            <p class="alert alert-danger" v-if="errors.gallery_name">{{errors.gallery_name[0]}}</p>
        </div>
        <div class="form-fields">
            <textarea id="description" name="description" cols="40" rows="5"  placeholder="Gallery descritption..." class="form-control" v-model="newGallery.description"></textarea>
            <p class="alert alert-danger" v-if="errors.description">{{errors.description[0]}}</p>
        </div>
        <div class="form-fields">
            <p>Insert images:</p>
            <div class="input-group-append" v-for="(n, index) in input_number" :key="index">
                <input id="image_url" name="image_url" v-model='newGallery.images[index]' placeholder="Image URL" required>
                <p class="alert alert-danger" v-if="errors.images">{{errors.images[0]}}</p>
                <p class="alert alert-danger" v-if="errors[`images.${index}`]">Invalid format...</p> 
                <button class="btn btn-outline-info btn-sm" v-if="input_number > 1" @click.prevent="deleteRow(index)">-</button>
            </div>
        </div>
        <div class="form-fields" style="text-align: center;">
            <button class="btn btn-sm" @click="addRow">Add image url</button>
        </div>
    
        <div class="form-fields">
            <button name="submit" type="submit" class="btn btn-sm">Submit</button>
            <button class="btn btn-sm" @click="cancel">Cancel</button>
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
            errors: [],
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
            this.errors = error.response.data.errors
            })
        },
        cancel(){
            if(this.$route.params.id)
            {
                this.$router.push({name:'gallery', params:{id:this.$route.params.id}})
            }else{
                this.$router.push({name:'galleries'})
            }
        }
    }
}
</script>
<style>
.form-wrapper {
    width:30%;
    margin:50px auto;
}
.form-fields {
    margin: 15px auto;
}
</style>

