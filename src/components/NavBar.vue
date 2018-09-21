<template>
  <nav class="navbar navbar-expand-sm justify-content-center">
    <div class="navbar-nav">
        <router-link class="nav-item nav-link" to="/"><p>ALL GALLERIES</p></router-link>
        <router-link class="nav-item nav-link" v-if="!isAuthenticated" to="/login"><p>LOGIN</p></router-link>
        <router-link class="nav-item nav-link" v-if="!isAuthenticated" to="/register"><p>REGISTER</p></router-link>
        <router-link class="nav-item nav-link" v-if="isAuthenticated" to="/my-galleries"><p>MY GALLERIES</p></router-link>
        <router-link class="nav-item nav-link" v-if="isAuthenticated" to="/create"><p>CREATE NEW GALLERY</p></router-link>
        <a class="nav-item nav-link" style="cursor:pointer;" v-if="isAuthenticated" @click="logout"><p>LOGOUT</p></a>
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
<style scoped>
.navbar-nav p {
    font-size: 0.7rem;
    font-weight: 800;
    color: #444e60;
}

</style>
