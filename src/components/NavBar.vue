<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            Home
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" to="/editor">
            New Post
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" to="/settings">
            Settings
          </router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link class="nav-link" to="/login">
            Login
          </router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link class="nav-link" to="/register">
            Signup
          </router-link>
        </li>
        <li v-if="username" class="nav-item nav-link" :to="`/@${username}`">
          {{ username }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    getUser() {
      this.$store.dispatch("users/getUser");
    }
  },
  created() {
    this.getUser();
  },
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  }
};
</script>
