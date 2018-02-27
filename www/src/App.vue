<template>
  <div id="app">

      
      <router-view/>
  </div>
</template>

<script>
  import router from './router'
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('getPosts')
    router.push('Login')
  }
}
</script>

<style>


</style>
