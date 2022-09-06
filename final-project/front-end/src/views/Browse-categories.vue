<template>
  <div class="post-content" v-if="this.user.isSignedIn">
    <h1>Browse categories</h1>
    <button class="pink-button" v-on:click="showCategory('motivation')">Motivation</button>
    <button class="pink-button" v-on:click="showCategory('anxiety')">Anxiety</button>
    <button class="pink-button" v-on:click="showCategory('overwhelm')">Overwhelm</button>
    <button class="pink-button" v-on:click="showCategory('loneliness')">Loneliness</button>
    <button class="pink-button" v-on:click="showCategory('self-esteem')">Self-esteem</button>
    <table cellspacing="0">
      <tr v-for="(post, index) in allPosts" :key="index">
        <td class="post">
          <div class="title">{{ post.title }}</div>
          <br>{{ post.content }}<br>
          <div class="category">{{ post.category }}</div>
          <div class="date">{{ post.date }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const client = require("../final-project-client");
export default {
  data() {
    return {
      allPosts: [],
      errors: "",
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    showCategory(category) {
      client.getPosts((errors, posts) => {
        if (errors.length == 0) {
          this.allPosts = [];
          for (let index = 0; index < posts.length; index++) {
            const element = posts[index].category;
            if (element == category) {
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
.pink-button {
  font-size: 18px;
  padding: 0.5em 1em;
}
</style>