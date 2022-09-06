<template>
  <div class="post-content" v-if="this.user.isSignedIn">
    <h1>Settings:</h1>
    <form onsubmit="return false;">
      <p class="label">Edit username:</p>
      <input type="text" v-model="username" placeholder="username">
      <p class="label">Edit password:</p>
      <input type="password" v-model="password" placeholder="Password">
      <h3 v-if="changedAccount">Your account has been updated.</h3>
      <br>
      <button class="pink-button" v-on:click="changeAccount()">Change username and password</button><br>
      <button class="remove" v-on:click="deleteAccount()">Remove this account?</button><br>
      <button class="button-logout" v-on:click="logOutUser()">Log out</button>
    </form>
  </div>
</template>

<script>
const client = require("../final-project-client");
export default {
  data() {
    return {
      account: "",
      accounts: "",
      username: "",
      password: "",
      changedAccount: false,
      newUsername: "",
      id: "",
      loggedOut: false,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  created() {
    this.getAccountById();
  },
  methods: {
    getAccountById() {
      client.getAccountById(this.user.id, (errors, account) => {
        if (errors.length == 0) {
          this.account = account;
          this.username = this.user.username;
          this.id = this.user.id;
          console.log(this.id);
        } else {
          console.log(errors);
        }
      });
    },
    logOutUser() {
      client.logOut(() => {
        this.user.isSignedIn = false;
        this.loggedOut = true;
        this.$router.push({ path: "/" });
      });
    },
    deleteAccount() {
      client.deleteAccount(this.user.id, (errors) => {
        if (errors.length == 0) {
          this.user.isSignedIn = false;
          this.$router.push({ path: "/" });
        } else {
          console.log(errors);
        }
      });
    },
    changeAccount() {
      const updatedAccount = {
        username: this.username,
        password: this.password,
      };
      console.log(this.user.id);
      client.updateAccount(this.user.id, updatedAccount, (errors) => {
        if (errors.length == 0) {
          console.log("account was updated");
          this.changedAccount = true;
          this.user.username = updatedAccount.username;
          this.password = "";
        } else {
          console.log(errors);
        }
      });
    },
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 0px;
}

.pink-button {
  font-size: 14px;
  padding: 0.5em 1em;
  margin-top: 10px;
}

.label {
  margin: 10px 330px 10px 0px;
}

.remove {
  color: #1c1c1c;
  font-weight: 700;
  margin: auto;
  font-size: 13px;
  background: none;
  cursor: pointer;
  border: none;
  font-family: "kulim park";
  margin-top: 20px;
}

.button-logout {
  width: 100px;
  padding: 15px 15px 15px 15px;
  margin: 220px 0px 0px 0px;
  text-decoration: none;
  border-radius: 100px;
  border: 0.5px solid rgb(32, 32, 32);
  color: white;
  font-family: "kulim park";
  font-weight: 700;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  background: linear-gradient(0deg, rgb(65, 65, 65) 0%, rgb(39, 39, 39) 100%);
}

.button-logout:hover {
  background: linear-gradient(0deg, rgb(15, 15, 15) 0%, rgb(49, 49, 49) 0%);
}
</style>