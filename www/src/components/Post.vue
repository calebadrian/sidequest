<template>
    <div class="post">
        <div class="col-sm-4">
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
                <button>Up</button>
            </div>
            <div class="row">
                <button>Down</button>
            </div>
        </div>
        <div class="col-sm-12">

            <div class="row">
                <div class="form-group">
                    <form @submit.prevent="addComment({body: $event.target.comment.value, postId: post._id, e: $event.target.reset()})">
                        <input type="text" name="comment" placeholder="Comment"></input>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </div>
        <div class="row comment-row d-flex flex-column" v-for="comment in comments">
            <p>{{comment.body}}</p>
            <p>
                <span v-if="comment.replies"># of replies: {{comment.replies.length}}</span> by username</p>
                <div class="row reply-row d-flex flex-column" v-for="reply in comment.replies">
                    <p>{{reply.body}}</p>
                    <!-- still need to incorporate show/hide on reply rows LATER-->
                    <p>by username</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
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
            }
        }
    }
</script>