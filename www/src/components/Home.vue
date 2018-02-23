<template>
  <div class="Home">
    <div class="container-fluid">
      <div class="row">
        <!-- onclick, show this form row-->
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
          <!-- error is here somewhere -->
          <div class="row post-row" v-for="post in posts">
            <div class="col-sm-6">
              <h1>{{post.title}}</h1>
              <p>{{post.body}}}</p>
              <!--make this clickable later-->
              <p>
                <span># of comments</span>
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
          <div class="row comment-row d-flex flex-column">
            <h6>Body of the comment</h6>
            <p>
              <span># of </span>
              <span>replies</span> by username</p>
          </div>
          <div class="row reply-row d-flex flex-column">
            <p>Body of the reply</p>
            <!-- still need to incorporate show/hide on reply rows -->
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