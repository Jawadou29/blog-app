import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


// fetch posts based on pageNumber
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// get posts count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postActions.setPostCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// get posts based on category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(postActions.setPostsCate(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// get posts based on category
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
        dispatch(postActions.setLoading())
        await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        }
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearIsPostCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearLoading())
    }
  }
}
// get post 
export function fetchPost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.setPost(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}
// get post 
export function togglerLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.setLikes(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

// update post image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + getState().auth.user.token
        }
      })
      toast.success("image updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// update post info
export function updatePostInfo(postId, newPost) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      })
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}


// delete post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`api/posts/${postId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

// get all posts
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}