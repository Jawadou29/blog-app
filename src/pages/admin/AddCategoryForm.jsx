import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addNewCategory } from '../../redux/apiCalls/categoryApiCall';

function AddCategoryForm() {
  const [title, setTitle] = useState("");
  
  const dispatch = useDispatch();

  // from submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("categoty title is required");
    
    dispatch(addNewCategory({title}));
    setTitle("")
  }
  return (
    <div className="add-category">
      <h6 className="add-category-title">add new category</h6>
      <form className="add-category-form" onSubmit={formSubmitHandler}>
        <div className="add-category-form-group">
          <label htmlFor="title">categoty title</label>
          <input type="text" placeholder='enter category title' value={title} onChange={(e) => setTitle(e.target.value)} id="title" />
        </div>
        <button className="add-category-btn" type="submit">add category</button>
      </form>
    </div>
  )
}

export default AddCategoryForm