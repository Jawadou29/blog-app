import { useState, useEffect } from "react";
import "./updatePostModel.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePostInfo } from "../../redux/apiCalls/postApiCall";
import { fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";

function UpdatePostModal({setUpdatePost, post}) {
  const dispatch = useDispatch();
  let { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategoty] = useState(post.category);

  // form submit handler
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    if (title.trim() === "") return toast.error("post title is required");
    if (description.trim() === "") return toast.error("post description is required");
    if (category.trim() === "") return toast.error("post category is required");

    dispatch(updatePostInfo( post._id, {title, description, category}))

    setUpdatePost(false);
    
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="update-post">
      <form className="update-post-form" onSubmit={fromSubmitHandler}>
        <abbr title="close">
          <i onClick={() => setUpdatePost(false)} className="bi bi-x-circle-fill update-post-form-close"></i>
        </abbr>
        <h1 className="update-post-title">update post</h1>
        <input type="text" className="update-post-input" value={title} onChange={(e) => setTitle(e.target.value) } />
        <select className="update-post-input" value={category} onChange={(e) => setCategoty(e.target.value)}>
          <option disabled value="">select a category</option>
          {
            categories.map((category) => (
              <option key={category._id} value={category.title}>{category.title}</option>
            ))
          }
        </select>
        <textarea className="update-post-textarea" rows={5} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type="submit" className="update-post-btn">update post</button>
      </form>
    </div>
  )
}

export default UpdatePostModal