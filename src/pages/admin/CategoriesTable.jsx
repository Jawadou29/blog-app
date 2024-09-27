import "./admin-table.css";
import AdminSidebar from './AdminSidebar'
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCategory, fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";

function CategoriesTable() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // delete category handler
  const deleteCategorytHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOK) => {
      if (isOK) {
        dispatch(deleteCategory(categoryId))
      }
    });
  }
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>cout</th>
              <th>category title</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => (
              <tr key={category?._id}>
                <td>{index+1}</td>
                <td>
                  <b>{category?.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategorytHandler(category?._id)}>delete post</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CategoriesTable;