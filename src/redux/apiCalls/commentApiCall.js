import { toast } from "react-toastify"
import request from "../../utils/request"
import { postActions } from "../slices/postSlice"
import { commentAcions } from "../slices/commentSlice"

// add comment
export function AddCommentToPost(commentInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", commentInfo, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      })
      dispatch(postActions.addCommentToPost(data))
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// update comment
export function updateCommentInPost(commentId, text) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/comments/${commentId}`, {text}, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      })
      dispatch(postActions.updateCommentInPost(data))
    } catch (error) {
      toast.error(error.response?.data?.message );
    }
  }
}

// delete comment
export function deleteCommentInPost(commentId) {
  return async (dispatch, getState) => {
    try {
      request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      })
      dispatch(commentAcions.deleteComment(commentId));
      dispatch(postActions.deleteCommentInPost(commentId));
    } catch (error) {
      toast.error(error.response?.data?.message );
    }
  }
}

// get all comments
export function getAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/comments/", {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      })
      console.log(data);
      
      dispatch(commentAcions.setAllComments(data));
    } catch (error) {
      toast.error(error.response?.data?.message );
    }
  }
}