<template>
    <div class="post">
        <div class="col-sm-6 padding1">
            <h3>{{post.title}}</h3>
            <p>{{post.body}}</p>
            <!--make this clickable later-->
            <p>
                <span># of comments: {{comments.length}}</span>
                <span>{{post.userId}}</span>
            </p>
        </div>
        <div class="col-sm-4 padding1">
            <img :src="post.image">
        </div>
        <div class="col-sm-2 padding1">
            <div class="row">
                <button @click="updatePostUp(post)">Up</button>
            </div>
            <div class="row">
                <h3>{{post.voteCount}}</h3>
            </div>
            <div class="row">
                <button @click="updatePostDown(post)">Down</button>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="form-group">
                <form @submit.prevent="addComment({body: $event.target.comment.value, postId: post._id, e: $event.target.reset()})">
                    <input type="text" name="comment" placeholder="Comment"></input>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
            <div class="row comment-row d-flex flex-column" v-for="comment in comments">
                <comment :comment="comment"></comment>
            </div>
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
            updatePostUp(post) {
                post.voteCount++
                this.$store.dispatch('updatePost', post)
            },
            updatePostDown(post) {
                post.voteCount--
                this.$store.dispatch('updatePost', post)
            }
        },
        components: {
            comment
        }
    }
</script>

<style>
    .padding1 {
        padding: 1rem
    }
</style>