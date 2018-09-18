<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-nav">
        <router-link class="nav-item nav-link" to="/">All Galleries</router-link>
        <router-link class="nav-item nav-link" v-if="!isAuthenticated" to="/login">Login</router-link>
        <router-link class="nav-item nav-link" v-if="!isAuthenticated" to="/register">Register</router-link>
        <router-link class="nav-item nav-link" v-if="isAuthenticated" to="/my-galleries">My Galleries</router-link>
        <router-link class="nav-item nav-link" v-if="isAuthenticated" to="/create">Create New Gallery</router-link>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { authService } from "../services/Auth.js";
import { EventBus } from "../main";

export default {
    name: "NavBar",
     data() {
        return {
            isAuthenticated: authService.isAuthenticated()
        }
    },
    methods: {
        logout() {
            authService.logout()
            this.isAuthenticated = false
            this.$router.push("/login");
        }
    },
    created() {
    EventBus.$on("changeStatus", data => {
        this.isAuthenticated = data;
        });
    }
}

</script>