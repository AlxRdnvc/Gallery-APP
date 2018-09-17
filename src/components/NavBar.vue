<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-nav">
        <router-link class="nav-item nav-link" to="/">All Galleries</router-link>
        <router-link class="nav-item nav-link" to="/login">Login</router-link>
        <router-link class="nav-item nav-link" to="/register">Register</router-link>
        <router-link class="nav-item nav-link" to="/my-galleries">My Galleries</router-link>
        <router-link class="nav-item nav-link" to="/create">Create New Gallery</router-link>
        <button>Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
    name: "NavBar",
}

</script>