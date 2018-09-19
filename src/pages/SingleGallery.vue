<template>
    <div class="container">
        <div class="card text-center w-100">
            <div class="card-body">
                <p>created by: <i><b>{{gallery.user.first_name}} {{gallery.user.last_name}}</b></i></p>
                <h5 class="card-text">{{gallery.gallery_name}}</h5>
                <p class="card-text">{{gallery.description}}</p>
                <b-carousel id="carousel1"
                    controls
                    indicators
                    background="#ababab"
                    img-width="600"
                    img-height="400"
                    :interval="3000"
                >
                <b-carousel-slide class="slider-item" v-for="(image, index) in gallery.images" :key="index"
                                      :img-src="image.image_url"/>
                </b-carousel>
            </div>
        </div><br>
        <div>
            <h5 class="card-title">Comments</h5>
            <div v-for="(comment, index) in gallery.comments" :key="index">
                <div>
                    <!-- <p class="card-text">Author: <i><b>{{comment.user_id.first_name}} {{comment.user_id.last_name}}</b></i></p> -->
                    <p class="card-text">Created at: {{ comment.created_at }} </p>
                    <p class="card-text">{{ comment.content }}</p><br>
                </div>
            </div><br><br>
            <div>
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="first_name" class="control-label col-xs-4">Type your comment</label> 
                        <div class="col-xs-8">
                            <input name="content" type="textarea" class="form-control" required="required">
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


export default {
    name: 'single-gallery',
    data() {
        return {
            gallery: [],
            comments: [],
        }
    },
    created() {
        galleryService.getSingleGallery(this.$route.params.id)
        .then(response => {
            this.gallery = response.data
            this.comments = this.gallery.comments
            console.log(this.gallery)
            console.log(this.comments)
        })
        .catch(error => {
                this.error = error.response.data.error
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
