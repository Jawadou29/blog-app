import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";


function Sidebar() {
  const dispatch = useDispatch();
  let { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchAllCategories())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories?.map((category) => (
          <Link
            className="sidebar-link"
            key={category?._id}
            to={`/posts/categories/${category?.title}`}
          >
            {category?.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
