import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import router from "../router"

var api = axios.create({
    baseURL: "//localhost:3000/api/",
    timeout: 5000
});

var auth = axios.create({
    baseURL: "//localhost:3000/auth/",
    timeout: 5000,
    withCredentials: true
});

vue.use(vuex);

export default new vuex.Store({
    state: {
        user: {},
        posts: [],
        comments: {},
        replies: {},

        // tabling votes for now until vote key is added to Post model
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;

            // Compares to values in the array and if b is greater than a then it goes above
            // if you wanted to go in ascending order as opposed to descending flip b.voteCount and a.voteCount
            state.posts.sort(function (a, b) {
                return b.voteCount - a.voteCount
            })
        },
        setComments(state, payload) {
            vue.set(state.comments, payload.postId, payload.comments || [])
        },
        setReplies(state, payload) {
            vue.set(state.replies, payload.commentId, payload.replies || [])
        },
        setUser(state, payload) {
            state.user = payload;
        }

    },
    actions: {
        // GET ALL POSTS
        getPosts({ commit, dispatch }) {
            api
                .get("posts/")
                .then(res => {
                    console.log(res);
                    commit("setPosts", res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // getPost({commit, dispatch}, payload) {
        //     api
        //         .get("posts/" + payload._id)
        //         .then(res => {
        //             console.log(res);
        //             commit("setPost", res.data);
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        // GET ALL COMMENTS ON A POST
        getComments({ commit, dispatch }, payload) {
            api
                .get("posts/" + payload._id + "/comments")
                .then(res => {
                    console.log(res);
                    commit("setComments", { postId: payload._id, comments: res.data });
                });
        },
        // GET ALL REPLIES ON A COMMENT
        getReplies({ commit, dispatch }, payload) {
            api
                .get("posts/" + payload.postId + "/comments/" + payload._id + "/replies")
                .then(res => {
                    commit("setReplies", { commentId: payload._id, replies: res.data });
                });
        },
        // ADD A POST
        addPost({ commit, dispatch }, payload) {
            api
                .post("posts", payload)
                .then(res => {
                    dispatch("getPosts");
                });
        },
        // ADD A COMMENT
        addComment({ commit, dispatch }, payload) {
            api
                .post("posts/" + payload.postId + "/comments", payload)
                .then(res => {
                    dispatch("getComments", { _id: res.data.postId });
                });
        },
        //ADD A REPLY
        addReply({ commit, dispatch }, payload) {
            api
                .post("posts/" + payload.postId + "/comments/" + payload.commentId + "/replies", payload)
                .then(res => {
                    console.log(res)
                    dispatch("getReplies", { _id: res.data.commentId, postId: res.data.postId });
                });
        },
        //DELETE A POST
        removePost({ commit, dispatch }, payload) {
            api
                .delete("posts/" + payload.postId)
                .then(res => {
                    dispatch("getPosts");
                });
        },
        //DELETE A COMMENT
        removeComment({ commit, dispatch }, payload) {
            api
                .delete("posts/" + payload.postId + "/comments" + payload.commentId)
                .then(res => {
                    dispatch("getComments");
                });
        },
        //DELETE A REPLY
        removeReply({ commit, dispatch }, payload) {
            api
                .delete("posts/" + payload.postId + "/comments" + payload.commentId + "replies" + payload._id)
                .then(res => {
                    dispatch("getReplies");
                });
        },
        //UPDATE A POST
        updatePost({ commit, dispatch }, payload) {
            console.log(payload._id)
            api
                .put("posts/" + payload._id, payload)
                .then(res => {
                    dispatch("getPosts");
                });
        },
        //UPDATE A COMMENT
        updateComment({ commit, dispatch }, payload) {
            api
                .put("posts/" + payload.postId + "/comments" + payload.commentId, payload)
                .then(res => {
                    dispatch("getComments");
                });
        },
        //UPDATE A REPLY
        updateReply({ commit, dispatch }, payload) {
            api
                .put("posts/" + payload.postId + "/comments" + payload.commentId + "replies" + payload._id, payload)
                .then(res => {
                    dispatch("getReplies");
                });
        },
        //UPDATE VOTE COUNT
        addVote({ commit, dispatch }, payload) {
            api
                .put("posts/" + payload.postId, payload)
                .then(res => {
                    dispatch("getVotes");
                });
        },
        // LOGIN
        // PLEASE WRITE:
        // putVotes(),
        login({ commit, dispatch }, payload) {
            auth
                .post("login", payload)
                .then(user => {
                    commit("setUser", user.data)
                    router.push({name: "Home"})
                })
                .catch(err => {
                    console.log('Invalid username or password')
                })
        },
        authenticate({commit, dispatch}){
            auth
                .get('authenticate')
                    .then(res => {
                        commit('setUser', res.data)
                    })
                    .catch(err => {
                        console.log('Invalid Username or Password')
                    })
        },
        createUser({ commit, dispatch }, payload) {
            auth
                .post("register", payload)
                .then(res => {
                    commit("setUser", res.data);
                })
                .catch(err => {
                    console.log('Invalid username or password')
                })
        },
    }
});