<template>
    <div class="example">
        <div class="row d-flex justify-content-between align-items-center full-width">
            <div class="col-sm-6 padding1">
                <h3>{{activePost.title}}</h3>
                <p>{{activePost.body}}</p>
                <!--make this clickable later-->
                <p>{{comments.length}} comments</p>
            </div>
            <div class="col-sm-6 padding1 text-center d-flex align-items-center justify-content-around">
                <img :src="activePost.image">
                <div class="d-inline-block">
                    <button class="btn-success" @click="updatePostUp(post)">Up</button>
                    <h3>{{activePost.voteCount}}</h3>
                    <button class="btn-danger" @click="updatePostDown(post)">Down</button>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group">
                    <button class="btn-info" v-if=!formhidden @click="toggleFormHide()">Hide Form</button>
                    <button class="btn-info" v-if=formhidden @click="toggleFormHide()">Add Comment</button>
                    <form v-if=!formhidden @submit.prevent="addComment({body: $event.target.comment.value, postId: post._id, e: $event.target.reset()})">

                        <textarea class="form-control" rows="3" type="text" name="comment" placeholder="Comment"></textarea>
                        <button type="submit">Add Comment</button>
                    </form>
                </div>
                <div class="row comment-row d-flex flex-column" v-for="comment in comments">
                    <comment :comment="comment" v-if=!hidden></comment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    import comment from './Comment.vue'
    export default {
        name: 'Example',
        mounted() {
            this.$store.dispatch('getPostById', this.$route.params.postId)
            this.$store.dispatch('getCommentsById', this.$route.params.postId)
        },
        computed: {
            activePost() {
                return this.$store.state.activePost
            },
            comments() {
                return this.$store.state.comments[this.activePost._id]
            }
        }
    }
</script>

<style>
</style>