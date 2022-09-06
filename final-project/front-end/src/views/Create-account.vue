<template>
  <div class="wrapper" v-if="!this.user.isSignedIn">
    <h1>Create an account!</h1>
    <form onsubmit="return false;">
      <p class="label">Choose a username:</p>
      <input type="text" v-model="username" placeholder="Username" /><br />
      <p class="label">Choose a password:</p>
      <input type="password" v-model="password" placeholder="Password" /><br />
      <h3><router-link to="/" class="router-link">Go back to login</router-link></h3>
      <button class="pink-button" v-on:click="createUser">Create account</button><br />
      <h3 v-if="userCreated">Your account for {{ this.createdUsername }} has been created! <router-link to="/">Log in here!</router-link></h3>
      <h3 v-if="usernameExist">The username is already taken, choose another one.</h3>
    </form>
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
      userCreated: false,
      createdUsername: "",
      usernameExist: false,
    };
  },
  methods: {
    createUser() {
      const account = {
        username: this.username,
        password: this.password,
      };

      client.createAccount(account, (errors, account) => {
        if (errors.length == 0) {
          console.log(account)
          this.userCreated = true;
          this.createdUsername = account.username;
          this.userCreated = true;
          this.username = "";
          this.password = "";
        } else {
          console.log(errors);
          this.usernameExist = true;
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
  margin: 10px 290px 10px 0px;
}
</style>