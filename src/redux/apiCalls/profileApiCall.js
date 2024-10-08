import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// get use profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// upload profile photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto,  {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data"
        }
      });

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);
      // modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}
// update profile
export function updateProfileInfo(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/users/profile/${userId}`, profile, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));
      // modify the user in local storage with new username
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// delete profile (account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(profileActions.clearIsProfileDeleted())
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  }
}

// get users count (for admin dashbord)
export function getUsersCount(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// get all users profile
export function getAllUsresProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}