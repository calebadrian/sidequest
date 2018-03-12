<template>
    <div class="login">
        <div class="col-sm-12">
            <h3>Welcome to SideQuest Please Login</h3>
              <form @submit.prevent="login()">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" v-model="user.name" placeholder="name">  
                  <label for="email">Email address:</label>
                  <input type="email" v-model="user.email" placeholder="email">
                  <label for="pwd">Password:</label>
                  <input type="password" v-model="user.password" placeholder="password">
                    <input type="checkbox"> Remember me</label>
                    <button type="submit" class="btn btn-default">Submit</button>
                  </div>
              </form>
              <form @submit.prevent="createUser()">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" v-model="user.name" placeholder="name">  
                  <label for="email">Email address:</label>
                  <input type="email" v-model="user.email" placeholder="email">
                  <label for="pwd">Password:</label>
                  <input type="password" v-model="user.password" placeholder="password">
                    <button type="primary" class="btn btn-default">Create Account</button>
                  </div>
              </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                }

            }
        },
        methods: {
            login(){
                this.$store.dispatch('login', this.user)
            },
            createUser() {
                this.$store.dispatch('createUser', this.user);
            },
        }
    }
</script>

<style>

</style>