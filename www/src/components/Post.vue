<template>
    <div class="post">
        <div class="col-sm-6">
            <h1>{{post.title}}</h1>
            <p>{{post.body}}</p>
            <!--make this clickable later-->
            <p>
                <span># of comments: {{comments.length}}</span>
                <span>{{post.userId}}</span>
            </p>
        </div>
        <div class="col-sm-6">
            <img :src="post.image">
        </div>
        <div class="col-sm-2">
                <div class="row">
                  <button @click="updatePostUp({post})">Up</button>
                </div>
                <div class="row">
                  <button @click="updatePostDown({post})">Down</button>
                </div>
              </div>
        <div class="row">
            <div class="form-group">
                <form @submit.prevent="addComment({body: $event.target.comment.value, postId: post._id, e: $event.target.reset()})">
                    <input type="text" name="comment" placeholder="Comment"></input>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </div>
        <div class="row comment-row d-flex flex-column" v-for="comment in comments">
            <comment :comment="comment"></comment>
        </div>
    </div>
</template>


<script>
    import comment from './Comment.vue'
    export default {
        name: 'Comment',
        props: ['post'],
        mounted() {
            this.$store.dispatch('getComments', this.post)
        },
        computed: {
            comments() {
                return this.$store.state.comments[this.post._id] || []
            }
        },
        methods: {
            addComment(comment) {
                this.$store.dispatch('addComment', comment);
            },
            updatePost(){
                this.$store.dispatch('updatePost', post)
            },
            updatePostUp(post){
                post.voteCount++ 
                this.$store.dispatch('updatePost', post)
            },
            updatePostDown(post) {
                post.voteCount--
                this.$store.dispatch('updatePost', post)
            }
        },
        components:{
            comment
        }
    }
</script>