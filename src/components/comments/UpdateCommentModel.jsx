import { useState } from "react";
import "./updateComment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCommentInPost } from "../../redux/apiCalls/commentApiCall";

function UpdateCommentModal({commentForUpdate, setUpdateComment}) {
  const [text, setText] = useState(commentForUpdate?.text);
  const dispatch = useDispatch();

  // form submit handler
  const fromSubmitHandler = (e) => {
    e.preventDefault()
    if (text.trim() === "") return toast.error("write something");

    dispatch(updateCommentInPost(commentForUpdate?._id, text))
    setUpdateComment(false)
    
  }
  return (
    <div className="update-comment">
      <form className="update-comment-form" onSubmit={fromSubmitHandler}>
        <abbr title="close">
          <i onClick={() => setUpdateComment(false)} className="bi bi-x-circle-fill update-comment-form-close"></i>
        </abbr>
        <h1 className="update-comment-title">update comment</h1>
        <input type="text" className="update-comment-input" value={text} onChange={(e) => setText(e.target.value) } />
        <button type="submit" className="update-comment-btn">edit comment</button>
      </form>
    </div>
  )
}

export default UpdateCommentModal;