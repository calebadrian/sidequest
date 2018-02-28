<template>
    <div class="post">
        <div class="row d-flex justify-content-between align-items-center full-width">
            <div class="col-sm-6 padding1">
                <h3><router-link :to="{name: 'Example', params: {postId: post._id}}">{{post.title}}</router-link></h3>
                <p>{{post.body}}</p>
                <!--make this clickable later-->
                <p>
                    <span>{{comments.length}} comments</span>
                    <span>{{post.userId}}</span>
                </p>
            </div>
            <div class="col-sm-6 padding1 text-center d-flex align-items-center justify-content-around">
                <img :src="post.image">
                <div class="d-inline-block">
                    <button class="btn-success" @click="updatePostUp(post)">Up</button>
                    <h3>{{post.voteCount}}</h3>
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
    import comment from './Comment.vue'
    export default {
        name: 'Post',
        data() {
            return {
                postId: this.$route.params.postId,
                hidden: true,
                formhidden: true,
                counter: 0
            }
        },
        props: ['post'],
        mounted() {
            this.$store.dispatch('getPosts')
        },
        computed: {
            comments() {
                return this.$store.state.comments[this.post._id] || []
            },
            activePost() {
                return this.$store.state.activePost
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
            },
            toggleHide() {
                this.hidden = !this.hidden
            },
            toggleFormHide() {
                this.formhidden = !this.formhidden
            },
            incCounter() {
                this.counter++
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

    .dark-blue {
        background: rgba(220, 220, 220, .9)
    }

    .light-blue {
        background: rgb(200, 200, 200)
    }

    .comment-highlight:hover {
        transition: linear all .2s;
        color: blue;
        user-select: none;
    }

    .full-width {
        width: 100%
    }
</style>