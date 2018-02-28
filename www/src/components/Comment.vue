<template>
    <div class="comment col-sm-12">


        <p>{{comment.body}}</p>
        <p>
            <span class="comment-highlight"@click="toggleHide()">{{replies.length}} replies</span></p>
        <div class="col-sm-12 reply-row d-flex flex-column" v-for="reply in replies" v-if=!hidden>
            <p>{{reply.body}}</p>
            <!-- still need to incorporate show/hide on reply rows LATER-->
            <p>by username</p>
        </div>

        <div class="col-sm-12">
            <div class="form-group">
                <button class="btn-info" v-if=!buttonhidden @click="toggleFormHide()">Add Reply</button>
                <form v-if=!formhidden @submit.prevent="addReply">
                        <textarea type="text" name="reply" placeholder="Reply" v-model="reply" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
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
                hidden: true,
                formhidden: true,
                buttonhidden: true,
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
            },
            comments() {
                return this.$store.state.comments[this.comment.postId] || []
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
            },
            toggleHide() {
                this.hidden = !this.hidden
                this.buttonhidden = !this.buttonhidden
            },
            toggleFormHide() {
                this.formhidden = !this.formhidden
            }
        }
    }
</script>

<style>
    .comment-highlight:hover{
        transition: linear all .2s;
        color: blue;
        user-select: none;
    }
</style>