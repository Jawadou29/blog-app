import "./admin-table.css";
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import swal from "sweetalert";
import { useEffect } from "react";
import { deleteCommentInPost, getAllComments } from "../../redux/apiCalls/commentApiCall";

function CommentsTable() {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(getAllComments())
  }, [])

  // delete post handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOK) => {
      if (isOK) {
        dispatch(deleteCommentInPost(commentId))
      }
    });
  }
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">comment</h1>
        <table className="table">
          <thead>
            <tr>
              <th>cout</th>
              <th>user</th>
              <th>comment</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img src={comment.user.profilePhoto.url} alt="img" className="table-user-image" />
                    <span className="table-username">{comment.username}</span>
                  </div>
                </td>
                <td>{comment.text}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(comment._id)}>delete comment</button>
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

export default CommentsTable;