import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    setAllComments(state, action) {
      state.comments = action.payload
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(c => c._id !== action.payload);
    }
  }
})

const commentReducer = commentSlice.reducer;
const commentAcions = commentSlice.actions;

export {commentAcions, commentReducer};