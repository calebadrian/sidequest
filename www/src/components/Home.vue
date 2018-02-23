<template>
  <div class="Home">
    <div class="container-fluid">
      <div class="row">
        <!-- onclick, show this form row later-->
        <!-- tie in this form data in the postPost() function in index.js that you write-->
        <div class="form-group">
          <form @submit.prevent="">
            <input type="text" placeholder="Post Title"></input>
            <input type="text" placeholder="Body"></input>
            <input type="url" placeholder="Image URL"></input>
            <button type="submit">Create Post</button>
            <button type="reset">Reset</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-10">
          <div class="row post-row" v-for="post in posts">
            <div class="col-sm-6">
              <h1>{{post.title}}</h1>
              <p>{{post.body}}}</p>
              <!--make this clickable later-->
              <p>
                <span># of comments: {{comments.length}}</span>
                <span>{{post.userId}}}</span>
              </p>
            </div>
            <div class="col-sm-6">
              <img src="//placehold.it/300x200">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
              <form @submit.prevent="">
                <input type="text" placeholder="Comment"></input>
                <button type="submit">Add Comment</button>
              </form>
            </div>
          </div>
          <div class="row comment-row d-flex flex-column" v-for="comment in comments">
            <p>{{comment.body}}}</p>
            <p><span># of replies: {{replies.length}}</span> by username</p>
          </div>
          <div class="row reply-row d-flex flex-column">
            <p>Body of the reply</p>
            <!-- still need to incorporate show/hide on reply rows LATER-->
            <p>by username</p>
          </div>
        </div>
        <div class="col-sm-2">
          <div class="row">
            <button>Up</button>
          </div>
          <div class="row">
            <button>Down</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        msg: 'testing'
      }
    },
    methods: {
      getPosts() {
        this.$store.dipsatch('getPosts');
      },
      getComments(post) {
        this.$store.dispatch('getComments', post);
      },
      getReplies (comment) {
        this.$store.dispatch('getReplies', comment);
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    border: solid 0.5px #000000;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>