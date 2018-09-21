<template>
    <div class="container">
        <div class="card text-center w-100">
            <div class="card-header">
                <p v-if="gallery.user">created by: <i><b>{{gallery.user.first_name}} {{gallery.user.last_name}}</b></i></p>
                <h5 class="card-title">{{gallery.gallery_name}}</h5>
                <p class="card-text">{{gallery.description}}</p>
            </div>
            <div class="card-body">
                <b-carousel id="carousel1" controls indicators :interval="3000">
                    <div class="slider-item" v-for="(image, index) in gallery.images" :key="index">
                        <a :href="image.image_url"  target="_blank">
                            <b-carousel-slide>
                                <img slot="img" target="_blank" class="d-block img-fluid w-100" :src="image.image_url" alt="image slot">
                            </b-carousel-slide>
                        </a>
                    </div>
                </b-carousel>
            </div>
            <div>
                <button name="galleryDelete" v-if="userID == gallery.user_id" @click="deleteGallery" class="btn btn-danger">Delete</button>
            </div>
        </div><br>
        <div>
            <h5 class="card-title">Comments</h5>
            <div v-for="(comment, index) in gallery.comments" :key="index">
                <div>
                    <p class="card-text">Author: <i><b>{{comment.user.first_name}} {{comment.user.last_name}}</b></i></p>
                    <p class="card-text">Created at: {{ comment.created_at }} </p>
                    <p class="card-text">{{ comment.content }}</p><br>
                    <button name="commentDelete" v-if="userID == gallery.comments[index].user_id" @click="deleteComment(comment.id, index)" class="btn btn-danger" >Delete</button>
                </div>
            </div><br><br>
            <div v-if="isAuth">
                <form class="form-horizontal" @submit.prevent="addComment">
                    <div class="form-group">
                        <label for="first_name" class="control-label col-xs-4">Type your comment</label> 
                        <div class="col-xs-8">
                            <input name="content" type="textarea" class="form-control" v-model="newComment.content" required="required">
                            <p class="alert alert-danger" role="alert" v-if="errors.content">{{errors.content[0]}}</p>
                        </div>
                        <div class="col-xs-offset-4 col-xs-8">
                            <button name="submit" type="submit" class="btn btn-primary">Add Comment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {galleryService} from "../services/GalleryService";
import {commentService} from '../services/CommentService';
import {authService} from '../services/Auth';


export default {
    name: 'single-gallery',
    data() {
        return {
            gallery: [],
            comments: [],
            userID: '',
            newComment: {
                content: '',
                gallery_id: '',
            },
            isAuth: '',
            errors: []
        }
    },
    created() {
        galleryService.getSingleGallery(this.$route.params.id)
        .then(response => {
            this.gallery = response.data
            this.comments = this.gallery.comments
            this.userID = authService.getUserId()
            this.isAuth = authService.isAuthenticated()
        })
        .catch(error => {
                this.errors = error.response.data.errors
        })
    },
    methods: {
        addComment() {
            this.newComment.gallery_id = this.gallery.id
            let userID = authService.getUserId()
            commentService.addComment(this.newComment)
            .then(response => {
                this.gallery.comments.push(response.data)
                this.newComment = {}
            })
            .catch(error => {
                this.errors = error.response.data.errors
            })
        }, 
        deleteComment(id, index){
            if (confirm("Are you sure?")){
                commentService.delete(id)
                .then(response => {
                    this.gallery.comments.splice(index, 1)
                })
            }
        },
        deleteGallery(){
            if (confirm("Are you sure?")) {
                galleryService.deleteGallery(this.gallery.id)
                .then(response => {
                    this.$router.push({name: 'my-galleries'})
                })
            }
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
.card-header{
    background-color: #e4e4e4;
    /* line-height: 1rem; */
    color: #444e60;
    font-size: 0.8rem;
    text-align: center
}
.card-body a {
    color: #444e60;
}
</style>
