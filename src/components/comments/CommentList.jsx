import "./commentList.css";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModel";
import { useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentInPost } from "../../redux/apiCalls/commentApiCall";
function CommentList({comments}) {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // delete comment handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOk) => {
      if (isOk) {
        dispatch(deleteCommentInPost(commentId));
      }
    });
  }

  // update comment handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment)
    setUpdateComment(true);
  }

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length === 0 ? "no comments yet" : comments?.length > 1 ? comments?.length + " comments" : "1 comment"}</h4>
      {comments?.map(comment => (
        <div className="comment-item" key={comment._id}>
          <div className="comment-item-info">
            <div className="comment-item-username">
              {comment.username}
            </div>
            <div className="comment-item-time">
            <Moment fromNow ago>
              {comment?.createdAt}
            </Moment> {" "}
            ago
            </div>
          </div>
          <div className="comment-item-text">
              {comment?.text}
          </div>
          <div className="comment-item-icon-wrapper">
            {
              user?._id === comment.user && (
                <>
                  <i className="bi bi-pencil-square" onClick={() => updateCommentHandler(comment)}></i>
                  <i onClick={() => deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
                  </>
              )
            }
          </div>
        </div>
      ))}
      {updateComment && <UpdateCommentModal commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment} />}
    </div>
  )
}

export default CommentList