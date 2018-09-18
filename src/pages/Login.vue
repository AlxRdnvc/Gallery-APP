<template>
    <div class="col-8 form-login">
        <h4>Welcome to login page</h4>
        <form @submit.prevent="login()">
            <div class="form-group row col-6">
                <input class="form-control here" type="text" id="email" placeholder="Your email..." v-model="email" required autofocus>
            </div>
            <div class="form-group row col-6">
                <input class="form-control here" type="password" id="password" placeholder="Your password..." v-model="password" required>
            </div>
            <p v-if="error" class="alert alert-danger row col-6" role="alert">Incorrect email or password</p>
            <button name="submit" type="submit" class="btn btn-primary">Submit</button>      
        </form>
    </div>
</template>
<script>
import { authService } from "../services/Auth.js";
import { EventBus } from "../main";


export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login() {
            authService.login(this.email, this.password)
            .then((response) => {
                this.$router.push('galleries')
                EventBus.$emit("changeStatus", "true");
            })
            .catch(error => {
                this.error = error.response.data.error
            })
        }
    }
}
</script>
