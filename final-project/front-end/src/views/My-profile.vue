<template>
  <div class="page" v-if="this.user.isSignedIn">
    <h1>My profile</h1>
    <form v-if="showEdit" onsubmit="return false;">
      <input type="text" v-model="title" placeholder="Title"><br>
      <input type="text" v-model="content" placeholder="Content"><br>
        <select v-model="category">
            <br>
            <option value="motivation">Motivation</option>
            <option value="self-esteem">Self-esteem</option>
            <option value="anxiety">Anxiety</option>
            <option value="overwhelm">Overwhelm</option>
            <option value="lonely">Lonely</option>
        </select><br>
      <input type="text" v-model="date" placeholder="Content"><br>
      <button class="pink-button" v-on:click="updatePost()">Update post</button>
      <button class="pink-button" v-on:click="() => {showEdit = !showEdit;}">Cancel</button>
    </form>
    <table cellspacing="0">
      <tr v-for="(post, index) in posts" :key="index">
        <td class="post">
          <div class="button-to-right">
            <button class="buttons" v-on:click="editPost(post, index)">...</button>
            <button class="buttons" v-on:click="deletePost(post.id)">X</button>
          </div>
          <div class="title">{{ post.title }}</div>
          <br>{{ post.content }}<br>
          <div class="category">{{ post.category }}</div>
          <div class="date">{{ post.date }}</div>
        </td>
      </tr>
    </table>
    <p v-if="this.user.id !== ''">Number of posts: {{ posts.length }}</p>
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
      posts: "",
      showEdit: false,
      title: "",
      selectedIndex: null,
    };
  },
  created() {
    this.getMyPosts();
  },
  methods: {
    getMyPosts() {
      this.user.id;
      client.getPostsByAccountId(this.user.id, (errors, posts) => {
        if (errors.length == 0) {
          this.posts = posts;
        } else {
          console.log(errors);
        }
      });
    },
    deletePost(id) {
      console.log(id)
      client.deletePost(id, (errors) => {
        if (errors.length == 0) {
          this.getMyPosts();
        } else {
          console.log(errors);
        }
      });
    },
    editPost(post, index) {
      this.showEdit = true;
      this.id = post.id;
      this.title = post.title;
      this.content = post.content;
      this.category = post.category;
      this.date = post.date;
      this.selectedIndex = index;
    },
    updatePost() {
      const updatedPost = {
        title: this.title,
        content: this.content,
        category: this.category,
        date: this.date,
      };
      console.log(this.id);
      client.updatePost(this.id, updatedPost, (errors) => {
        if (errors.length == 0) {
          console.log("post was updated");
          this.posts.splice(this.selectedIndex, 1, updatedPost);
          this.showEdit = false;
        } else {
          console.log(errors);
        }
      });
    },
  },
};
</script>

<style scoped>
.button-to-right {
  margin-left: 500px;
  display: flex;
}

.buttons {
  align-items: right;
  font-size: 14px;
  text-align: right;
  display: block;
  cursor: pointer;
  color: white;
  margin-bottom: 100px;
  background: none;
  border: none;
  font-family: "kulim park";
  font-weight: 700;
  font-size: 24px;
  margin: 0px 0px 0px 10px;
  padding: 0;
}

.buttons:hover {
  background: none;
  color: rgba(228, 136, 136, 1);
}
</style>