<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-nav">
        <router-link class="nav-item nav-link" to="/">All Galleries</router-link>
        <router-link class="nav-item nav-link" to="/login">Login</router-link>
        <router-link class="nav-item nav-link" to="/register">Register</router-link>
        <router-link class="nav-item nav-link" to="/my-galleries">My Galleries</router-link>
        <router-link class="nav-item nav-link" to="/create">Create New Gallery</router-link>
        <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { authService } from "../services/Auth.js";

export default {
    name: "NavBar",
    methods: {
        logout() {
            authService.logout()
            this.$router.push("/login");
        }
    }
}

</script>