<template>
  <div class="app" v-if="this.user.isSignedIn">
    <header>
      <div class="router-links">
        <img class="logo" alt="logo" src="./assets/logo.png" />
        <h3>{{ this.user.username }}</h3>
        <router-link to="/AllPosts"><img alt="all-posts-icon" src="./assets/posts.png">All Posts</router-link>
        <router-link to="/BrowseCategories"><img alt="categories-icon" src="./assets/categories.png">Browse Categories</router-link>
        <router-link to="/CreatePost"><img alt="create-post-icon" src="./assets/create.png">Create Post</router-link>
        <router-link to="/MyProfile"><img alt="profile-icon" src="./assets/profile.png">My Profile</router-link>
        <router-link to="/Settings"><img alt="settings-icon" src="./assets/settings.png">Settings</router-link>
      </div>
    </header>
    <div class="content">
      <router-view :user="user"/>
    </div>
  </div>
  <div class="wrapper" v-else-if="!this.user.isSignedIn">
    <router-view :user="user"/>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      user: { isSignedIn: false, id: "", username: "" },
    };
  },
};
</script>

<style>
/* body and main divs */
body {
  background: #e6f0f2;
  margin: 0;
  height: 100%;
}

.app {
  font-family: "kulim park";
  font-weight: 100;
  text-align: center;
  color: #1c1c1c;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  margin: 0;
}

.content {
  width: 75%;
  position: relative;
  min-height: 100vh;
  background: #e6f0f2;
  overflow: visible;
}

.wrapper {
  background: linear-gradient(0deg,rgba(255, 255, 255, 1) 0%,rgba(236, 201, 201, 1) 100%);
  text-align: center;
  position: fixed;
  font-family: "kulim park";
  font-weight: 100;
  color: #1c1c1c;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0px 0px 0px 0px;
  text-align: center;
  color: #ffffff;
}

/* images and logos */
img {
  width: 30px;
  padding-right: 30px;
  margin: 0;
  background: none;
}

.logo {
  width: 60px;
  margin-left: 95px;
  background: none;
  margin-bottom: 5px;
}

/* font styles */
h1 {
  color: #1c1c1c;
  font-weight: 700;
  text-decoration: none;
  margin-top: 50px;
}
h3 {
  align-items: center;
  font-size: 14px;
  text-align: center;
  display: block;
  margin-bottom: 70px;
  color: #1c1c1c;
  font-weight: 700;
  text-decoration: none;
}

/* buttons */
.pink-button {
  display: inline-block;
  padding: 1.5em 2em;
  text-decoration: none;
  cursor: pointer;
  border-radius: 100px;
  border: 0.5px solid rgb(233, 173, 173);
  color: #1c1c1c;
  background: linear-gradient(0deg,rgb(245, 215, 215) 0%,rgb(233, 173, 173) 100%);
  font-family: "kulim park";
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 20px;
}

.pink-button:hover {
  background: linear-gradient(0deg,rgb(245, 215, 215) 0%,rgb(233, 173, 173) 0%);
}

.pink-button:active {
  -ms-transform: translateY(4px);
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  border-bottom: none;
}

/* header */
header {
  padding-top: 100px;
  position: fixed;
  display: flex;
  margin: 0;
  width: 25%;
  min-height: 100vh;
  overflow: visible;
  top: 0;
  left: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg,rgba(255, 255, 255, 1) 0%,rgba(236, 201, 201, 1) 100%);
}

header a {
  margin: 0px 0px 0px 0px;
  font-family: "kulim park";
  display: block;
  font-weight: 700;
  color: #1c1c1c;
  opacity: 30%;
  text-decoration: none;
  padding-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: left;
}

header a:last-child {
  margin-top: 150px;
}

header a:hover {
  opacity: 30%;
}

/* router links */
.router-links {
  align-items: center;
  margin: 0px 0px 0px 40px;
  padding: 0;
  text-align: left;
  display: block;
  background: none;
  font-weight: 700;
}

.router-links a {
  background: none;
  display: flex;
  align-items: center;
  padding: 0;
  font-weight: 700;
  margin: 0px 0px 30px 0px;
}
a.router-link-active {
  text-decoration: none;
  font-weight: 700;
  color: #1c1c1c;
}
a.router-link-exact-active.router-link-active {
  opacity: 100%;
  background: none;
}

/* form */
input {
  font-family: "kulim park";
  font-weight: 100;
  font-size: 14px;
  width: 420px;
  border: none;
  padding: 10px;
  margin: 0px 0px 10px 0px;
  border-radius: 10px;
  background: white;
  letter-spacing: 1px;
}

input:focus {
  box-shadow: 5px 5px 10px 5px rgba(211, 211, 211, 0.5);
  outline: none;
}

.label {
  color: #1c1c1c;
  font-weight: 500;
  margin: 10px 320px 10px 0px;
  font-size: 16px;
}

textarea {
  font-family: "kulim park";
  font-weight: 100;
  font-size: 14px;
  border: none;
  padding: 10px 10px 100px 10px;
  margin: 0px 0px 0px 0px;
  border-radius: 10px;
  letter-spacing: 1px;
  width: 420px;
}

textarea:focus {
  box-shadow: 5px 5px 10px 5px rgba(211, 211, 211, 0.5);
  outline: none;
}

select {
  font-family: "kulim park";
  font-size: 16px;
  padding: 10px;
  width: 440px;
  border: 1px solid #ccc;
  margin: 0px 0px 10px 0px;
  background: white;
  border: none;
  border-radius: 10px;
}

select:focus {
  box-shadow: 5px 5px 10px 5px rgba(211, 211, 211, 0.5);
}

/* table */
table {
  border-collapse: separate;
  border-spacing: 0 15px;
  margin: auto;
}

.post {
  width: 500px;
  height: 150px;
  padding: 20px 35px 10px 35px;
  background: linear-gradient(0deg,rgb(245, 215, 215) 0%,rgb(233, 191, 191) 100%);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  white-space: pre-wrap;
}

.date {
  font-size: 12px;
  margin-top: 20px;
  font-weight: 800;
  margin-bottom: 10px;
}

.category {
  font-size: 14px;
  margin-top: 20px;
  font-weight: 800;
  color: rgba(228, 136, 136, 1);
}

.title {
  font-weight: 800;
  text-transform: uppercase;
  font-size: 20px;
}

.content {
  font-weight: 100;
  white-space: pre-wrap;
}
</style>
