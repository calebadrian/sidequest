<template>
    <div class="comment col-sm-12"">


        <p>{{comment.body}}</p>
        <p>
            <span># of replies: {{replies.length}}</span> by username</p>
        <div class="col-sm-12 reply-row d-flex flex-column" v-for="reply in replies">
            <p>{{reply.body}}</p>
            <!-- still need to incorporate show/hide on reply rows LATER-->
            <p>by username</p>
        </div>

        <div class="col-sm-12">
            <div class="form-group">
                <form @submit.prevent="addReply">
                    <input type="text" name="reply" placeholder="Reply" v-model="reply"></input>
                    <button type="submit">Add Reply</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                reply: ''
            }
        },
        props: ['comment'],
        mounted() {
            this.$store.dispatch('getReplies', this.comment)
        },
        computed: {
            replies() {
                return this.$store.state.replies[this.comment._id] || []
            }
        },
        methods: {
            addReply() {
                let reply = {
                    body: this.reply,
                    commentId: this.comment._id,
                    postId: this.comment.postId
                }
                console.log(reply)
                this.$store.dispatch('addReply', reply);
            }
        }
    }
</script>