<template>
  <div class="post-content" v-if="this.user.isSignedIn">
    <h1>Hi and welcome back {{ this.user.username }}! <br> How are you feeling today?</h1>
    <button class="pink-button"><router-link to="/CreatePost" class="router-link">Share your thoughts here</router-link></button><br>
    <h1>Latest Posts</h1>
    <table v-if="postsExist" cellspacing="0">
      <tr v-for="(post, index) in allPosts" :key="index">
        <td class="post">
          <div class="title">{{ post.title }}</div>
          <br>{{ post.content }}<br>
          <div class="category">{{ post.category }}</div>
          <div class="date">{{ post.date }}</div>
        </td>
      </tr>
    </table>
    <h1>What category do you want to browse today?</h1>
    <button class="pink-button"><router-link to="/BrowseCategories" class="router-link">Browse here</router-link></button>
  </div>
</template>

<script>
const client = require("../final-project-client");
export default {
  data() {
    return {
      posts: [],
      errors: "",
      allPosts: [],
      postsExist: false,
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      client.getPosts((errors, posts) => {
        if (errors.length == 0 && posts.length != 0) {
          this.postsExist = true;
          this.allPosts = [];
          if (posts.length < 5) {
            for (let index = 0; index < posts.length; index++) {
              this.allPosts.push(posts[index]);
            }
          } else {
            for (let index = 0; index < 5; index++) {
              this.allPosts.push(posts[index]);
            }
          }
        } else {
          console.log(errors);
        }
      });
    },
  },
};
</script>

<style scoped>
.post-content {
  padding-bottom: 30px;
}

.router-link {
  text-decoration: none;
  font-weight: 700;
  color: #1c1c1c;
}
</style>