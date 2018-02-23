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
        posts: [], 
        comments: [],
        replies: []
        // tabling votes for now until vote key is added to Post model
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        },
        setComments(state, payload) {
            state.comments = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setReplies(state, payload) {
            state.replies = payload;
        }
        //PLEASE SET: 
        // putVotes(), postPost(), postComment(), postReply()
        // deletePost(), deleteComment(), deleteReply()
    },
    actions: {
        // GET ALL POSTS
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
        },
        // GET ALL COMMENTS ON A POST
        getComments({ commit, dispatch }, payload) {
            api
                .get("posts/" + payload.postId + "/comments")
                .then(res => {
                    console.log(res);
                    commit("setComments", res.data);
                });
        },
        // GET ALL REPLIES ON A COMMENT
        getReplies({ commit, dispatch}, payload) {
            api
                .get("posts/" + payload.postId+ "/comments/" + payload.commentId + "/replies")
                .then(res => {
                    console.log(res);
                    commit("setReplies", res.data);
                });
        },
        // GET USER
        getUser({ commit, dispatch }, payload) {
            api
                .get("users")
                .then(res => {
                    console.log(res);
                    commit("setUsers", res.data);
                });
        }
        // PLEASE WRITE:
        // putVotes(), postPost(), postComment(), postReply()
        // deletePost(), deleteComment(), deleteReply()
    }
});