import { useState, useEffect } from "react";
import "./createPost.css";
import {toast} from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchAllCategories } from "../../redux/apiCalls/categoryApiCall";

function CreatePost() {
  const dispatch = useDispatch();
  const {loading, isPostCreated} = useSelector(state => state.post);
  let { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("post title is required");
    if (description.trim() === "") return toast.error("post description is required");
    if (category.trim() === "") return toast.error("post category is required");
    if (!file) return toast.error("post image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
    
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/")
    }
  }, [isPostCreated, navigate])

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="create-post">
      <h1 className="create-post-title">
        Create new Post
      </h1>
      <form onSubmit={formSubmitHandler} className='create-post-form'>
        <input type="text" placeholder='Post title' className='create-post-input' value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className='create-post-input' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option disabled value="">select a category</option>
          {
            categories.map((category) => (
              <option key={category._id} value={category.title}>{category.title}</option>
            ))
          }
        </select>
        <textarea className='create-post-textarea' rows="5" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="file" name="file" id="file" className='create-post-upload' onChange={(e) => setFile(e.target.files[0])}/>
        <button type="submit" className='create-post-btn'>
          {
            loading ?  (<RotatingLines
              visible={true}
              height="20"
              width="20"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />)
              : "Create"
          }
        </button>
      </form>
    </section>
  );
}

export default CreatePost