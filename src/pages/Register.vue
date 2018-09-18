<template>
    <div class="col-8 form-login">
        <h4>Create a New Account</h4>
        <p>It’s free and always will be.</p>
        <form @submit.prevent="register()">
            <div class="form-group row col-6">
                <input class="form-control here" type="text" id="first_name" placeholder="Your first name..." v-model="newUser.first_name" required autofocus>
                <p class="alert alert-danger" role="alert" v-if="errors.first_name">{{errors.first_name[0]}}</p>
            </div>
            <div class="form-group row col-6">
                <input class="form-control here" type="text" id="last_name" placeholder="Your last name..." v-model="newUser.last_name" required>
                <p class="alert alert-danger" role="alert" v-if="errors.last_name">{{errors.last_name[0]}}</p>
            </div>
            <div class="form-group row col-6">
                <input class="form-control here" type="text" id="email" placeholder="Your email..." v-model="newUser.email" required>
                <p class="alert alert-danger" role="alert" v-if="errors.email">{{errors.email[0]}}</p>
            </div>
            <div class="form-group row col-6">
                <input class="form-control here" type="password" id="password" placeholder="Your password..." v-model="newUser.password" required>
                <p class="alert alert-danger" role="alert" v-if="errors.password">{{errors.password[0]}}</p>
            </div>
            <div class="form-group row col-6">
                <input class="form-control here" type="password" id="password_confirmation" placeholder="Confirm your password..." v-model="newUser.password_confirmation" required>
                <p class="alert alert-danger" role="alert" v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</p>
            </div>
            <div class="form-group">
                <div class="col-6">
                    <label for="accepted_terms_and_conditions" class="ol-form-label">I accept terms and conditions</label>
                    <input v-model="newUser.accepted_terms_and_conditions" class="checkbox" id="accepted_terms_and_conditions" type="checkbox" name="accepted_terms_and_conditions" value="1" required>
                </div>
            </div>
            <button name="submit" type="submit" class="btn btn-primary">Submit</button>      
        </form>
    </div>

</template>
<script>
import { authService } from "../services/Auth.js";

export default {
    name: 'register',
    data() {
        return {
        newUser: {},
        errors: []
        }
    },
    methods: {
        register() {
            authService.addUser(this.newUser)
            .then(() => {
            this.$router.push('galleries')
            })
            .catch(error => {
                this.errors = error.response.data.errors
            })
        }
    }
}
</script>