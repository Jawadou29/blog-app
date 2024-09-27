import { useState } from "react";
import "./add-comment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddCommentToPost } from "../../redux/apiCalls/commentApiCall";


function AddComment({postId}) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");
    dispatch(AddCommentToPost({postId ,text}));
    setText("")
  }
  return (
    <form className="add-comment" onSubmit={formSubmitHandler}>
      <input type="text" placeholder="add a comment" className="add-comment-input" value={text} onChange={(e) => setText(e.target.value)}/>
      <button type="submit" className="add-comment-btn">Comment</button>
    </form>
  )
}

export default AddComment