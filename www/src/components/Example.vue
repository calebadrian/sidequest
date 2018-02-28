<template>
    <div class="example">
        <h3>{{activePost.title}}</h3>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name: 'Example',
        mounted(){
            this.$store.dispatch('getPostById', this.$route.params.postId)
        },
        computed: {
            activePost() {
                this.$store.state.activePost
            }
        }
    }
</script>

<style>

</style>