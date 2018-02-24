<template>
  <div class="Home">
    <div class="container">
      <div class="row">
        <!-- onclick, show this form row later-->
        <!-- tie in this form data in the postPost() function in index.js that you write-->
        <div class="form-group">
          <form @submit.prevent="addPost({title: $event.target.title.value, body: $event.target.body.value, image: $event.target.image.value})">
            <input type="text" name="title" placeholder="Post Title"></input>
            <input type="text" name="body" placeholder="Body"></input>
            <input type="url" name="image" placeholder="Image URL"></input>
            <button type="submit">Create Post</button>

            <button type="reset">Reset</button>

          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="row post-row" v-for="post in posts">
              <post :post="post"></post>
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
    data() {
      return {
        msg: 'testing'
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
      }
    },
    components: {
      post
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  * {
    border: solid 0.5px #000000;
  }


  img {
    width: 75%;
  }

  /* h1,
  h2 {
    font-weight: normal;
  } */

  /* ul {
    list-style-type: none;
    padding: 0;
  } */

  /* li {
    display: inline-block;
    margin: 0 10px;
  } */

  a {
    color: #42b983;
  }

  /* div {
    display: flex !important;
    flex-direction: column;
} */
  .comment-input-height{
    height: 250px;
    width: 350px;
  } 
  .post{
    display: flex;
    flex-wrap: wrap;
  }

  .comment-row{
    display: flex;
  }
</style>