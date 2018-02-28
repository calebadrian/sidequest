<template>
  <div class="Home">
    <div class="container">
      <div class="row logo-row justify-content-center">
        <div class="col-sm-12 text-center">
          <img src="https://files.slack.com/files-pri/T1GGQN1RU-F9DM6DX4Z/side-quest-logo-2.png" class="logo">


        </div>
      </div>
      <div class="row">
        <!-- onclick, show this form row later-->
        <!-- tie in this form data in the postPost() function in index.js that you write-->

        <div class="col-sm-12">
          <!-- toggleHide will toggle the hidden property in the data below -->
          <button class="btn-info" @click="toggleHide()">Add a Post</button>

          <!-- v-if says that if this element is not hidden it will display -->
          <div class="form-group" v-if=!hidden>
            <form @submit.prevent="addPost({title: $event.target.title.value, body: $event.target.body.value, image: $event.target.image.value})">
              <input type="text" name="title" placeholder="Post Title"></input>
              <textarea type="text" name="body" placeholder="Body" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              <input type="url" name="image" placeholder="Image URL"></input>
              <button class="btn-success" type="submit">Create Post</button>
  
              <button class="btn-danger" type="reset">Reset</button>
  
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 post-row" v-for="post in posts">
            <div :class="{active: activePost == post}">
              <post :post="post" class="post-row"></post>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import post from './Post.vue'
  export default {
    name: 'Home',
    mounted() {
      this.$store.dispatch('getPosts')
    },
    data() {
      return {
        msg: 'testing',
        hidden: true,
        formhidden: true
      }
    },
    methods: {
      getPosts() {
        this.$store.dispatch('getPosts');
      },
      getComments(post) {
        this.$store.dispatch('getComments', post);
      },
      getReplies(comment) {
        this.$store.dispatch('getReplies', comment);
      },
      getVotes(post) {
        this.$store.dispatch('getVotes', post)
      },
      addPost(post) {
        this.$store.dispatch('addPost', post);
      },
      addReply(reply) {
        this.$store.dispatch('addReply', reply);
      },
      removePost(post) {
        this.$store.dispatch('removePost', post)
      },
      removeComment(comment) {
        this.$store.dispatch('removeComment', comment)
      },
      removeReply(reply) {
        this.$store.dispatch('removeReply', reply)
      },
      updatePost(post) {
        this.$store.dipatch('updatePost', post)
      },
      updateComment(comment) {
        this.$store.dipatch('updateComment', comment)
      },
      updateReply(reply) {
        this.$store.dipatch('updateReply', reply)
      },

      // this function is the toggle of the hidden value to switch the display
      toggleHide() {
        this.hidden = !this.hidden
      },
      toggleFormHide() {
        this.formhidden = !this.formhidden
      }

      // ADD METHODS FOR EACH ACTION YOU WRITE
    },
    computed: {
      posts() {
        return this.$store.state.posts;
      },
      comments() {
        return this.$store.state.comments;
      },
      user() {
        return this.$store.state.user;
      },
      replies() {
        return this.$store.state.replies;
      },
      votes() {
        return this.$store.state.votes;
      },
      activePost() {
        return this.$store.state.activePost
      }
    },
    components: {
      post
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /* * {
    border: solid 0.5px #000000;
  } */

  .logo-row {
    background-color: rgb(42, 56, 66);
  }

  .logo {
    width: 60%;
    height: auto;
    text-align: center;
  }

  img {
    width: 75%;
  }

  .container {
    background-color: rgba(200, 200, 200, 0.9);
  }

  .post-row {
    width: 100%
  }

  body {
    background-color: rgb(42, 109, 140);
    background-image: url("https://www.transparenttextures.com/patterns/checkered-light-emboss.png");
  }

  /* div {
    display: flex !important;
    flex-direction: column;
} */

  .post {
    display: flex;
    flex-wrap: wrap;
  }

  .comment-row {
    display: flex;
  }
</style>