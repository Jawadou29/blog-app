import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCate: [],
    loading: false,
    isPostCreated: false,
    post: null
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCate(state, action) {
      state.postsCate = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.loading = false;
      state.isPostCreated = true;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = false;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setLikes(state, action) {
      state.post.likes = action.payload.likes;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(p => p._id !== action.payload);
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
    updateCommentInPost(state, action) {
      state.post.comments = state.post.comments.map(comment => 
        comment._id === action.payload._id ? action.payload : comment
    );
    },
    deleteCommentInPost(state, action) {
      state.post.comments = state.post.comments.filter(comment => {
        return comment._id !== action.payload;
      })
    }
  }
})
export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;