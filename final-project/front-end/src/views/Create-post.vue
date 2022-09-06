<template>
  <div id="post-content" v-if="this.user.isSignedIn">
    <form onsubmit="return false;">
      <h1>Create your post</h1>
      <h4>Title:</h4>
      <input type="text" v-model="title"><br>
      <h4>Content:</h4>
      <textarea name="text" rows="5" cols="10" wrap="soft" class="input-content" v-model="content"/><br>
      <h4>Choose a category:</h4>
      <select v-model="category"><br>
        <option value="motivation">Motivation</option>
        <option value="self-esteem">Self-esteem</option>
        <option value="anxiety">Anxiety</option>
        <option value="overwhelm">Overwhelm</option>
        <option value="loneliness">Loneliness</option></select><br>
      <button class="pink-button" v-on:click="createPost()">Send post</button>
    </form>
    <h3 v-if="postCreated">Your post {{ this.showTitle }} has now been sent to the cyber space!</h3>
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
      title: "",
      content: "",
      category: "",
      date: "",
      showTitle: "",
      postCreated: false,
    };
  },
  methods: {
    createPost() {
      const now = new Date();
      const post = {
        accountId: this.user.id,
        title: this.title,
        content: this.content,
        category: this.category,
        date: now.getFullYear() + "-" + parseInt(now.getMonth() + 1) + "-" + now.getDate()
      };
      client.createPost(post, (errors, post) => {
        if (errors.length == 0) {
          this.postCreated = true;
          this.title = "";
          this.content = "";
          this.category = "";
          this.date = "";
          this.showTitle = post.title;
        } else {
          console.log(errors)
        }
      });
    },
  },
};
</script>

<style scoped>
h4 {
  font-size: 20px;
  margin: 0px;
  font-weight: 500;
  padding: 20px 0px 20px 0px;
}
</style>