<template>
  <div class="wrapper" v-if="!this.user.isSignedIn">
    <h1>Sign in to your account!</h1>
    <form onsubmit="return false;">
      <p v-if="this.notValid">Wrong password or username, try again!</p>
      <p class="label">Your username:</p>
      <input type="text" v-model="username" placeholder="Username" /><br />
      <p class="label">Your password:</p>
      <input type="password" v-model="password" placeholder="Password" /><br />
      <h3>Don't have an account? <router-link to="/CreateAccount" class="router-link">Create one here!</router-link></h3>
      <button class="pink-button" v-on:click="loginUser()">Sign in</button>
    </form>
    <h3 v-if="loggedIn">Welcome back {{ this.loggedInUser }}!</h3>
  </div>
</template>

<script>
const client = require("../final-project-client");
export default {
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      username: "",
      password: "",
      loggedInUser: "",
      loggedIn: false,
      notValid: false,
    };
  },
  methods: {
    loginUser() {
      const username = this.username;
      const password = this.password;
      client.logIn(username, password, (errors, account) => {
        if (errors.length == 0) {
          console.log(account.id);
          this.notValid = false;
          this.loggedInUser = account.username;
          this.user.id = account.id;
          this.user.isSignedIn = true;
          this.loggedIn = true;
          this.user.username = account.username;
          console.log(this.user.username);
          this.username = "";
          this.password = "";
          this.$router.push({ path: "/AllPosts" });
        } else {
          console.log(errors);
          this.notValid = true;
        }
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: rgba(228, 136, 136, 1);
  margin-top: 150px;
}

.router-link {
  text-decoration: none;
  font-weight: 700;
  color: #1c1c1c;
}

.label {
  margin: 10px 330px 10px 0px;
}
</style>