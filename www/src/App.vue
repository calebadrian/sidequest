<template>
  <div id="app">
    <div class="our-div">

      
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('getPosts')
  }
}
</script>

<style>


/* .our-div {
  display: inline-flex!important
} */
</style>
