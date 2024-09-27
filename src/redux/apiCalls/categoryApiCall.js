import { toast } from "react-toastify";
import request from "../../utils/request";
import { categoryActions } from "../slices/categotySlice";

// get all categories
export function fetchAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// add new category
export function addNewCategory(newCate) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCate, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        }
      });
      dispatch(categoryActions.addCategory(data));
      toast.success(`"${newCate.title}" category added`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}

// delete category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token
        }
      })
      dispatch(categoryActions.deleteCategory(categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}