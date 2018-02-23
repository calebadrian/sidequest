import vue from "vue";
import vuex from "vuex";
import axios from "axios";

var api = axios.create({
    baseURL: "//localhost:3000/api/",
    timeout: 5000
});

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {
            name: "testUser"
        },
        posts: [], // tabling votes for now 
        comments: [],
        replies: []
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        }
    },
    actions: {
        getPosts({ commit, dispatch }, payload) {
            api
                .get("posts")
                .then(res => {
                    console.log(res);
                    commit("setPosts", res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
});