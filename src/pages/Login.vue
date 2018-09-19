<template>
<div class="wrapper">
    <div class="form-wrapper">
        <h4>Welcome to login page</h4>
        <form @submit.prevent="login()">
            <div class="form-fields">
                <input class="form-control here" type="text" id="email" placeholder="Your email..." v-model="email" required autofocus>
            </div>
            <div class="form-fields">
                <input class="form-control here" type="password" id="password" placeholder="Your password..." v-model="password" required>
            </div>
            <p v-if="error" class="alert alert-danger row" role="alert">Incorrect email or password</p>
            <div class="form-fields">
                <button name="submit" type="submit" class="btn" style="width: 100%;">Login</button>
            </div>     
        </form>
    </div>
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
<style>
.form-wrapper {
    width:30%;
    margin:50px auto;
}
.form-fields {
    margin: 15px auto;
}
</style>

