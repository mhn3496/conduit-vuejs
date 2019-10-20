<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <ul class="error-messages">
            <li v-for="error in errors" v-bind:key="error">
              {{ error.message }}
            </li>
          </ul>
          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="email"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="password"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button @click="login" class="btn btn-lg btn-primary pull-xs-right">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  data: function() {
    var obj = {
      password: "",
      email: "",
      errors: []
    };
    return obj;
  },
  methods: {
    login() {
      this.$store
        .dispatch("users/loginUser", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.errors = [];
          router.push({ name: "home" });
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  }
};</script
>>
