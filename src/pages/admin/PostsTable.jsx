import { Link } from "react-router-dom";
import "./admin-table.css";
import AdminSidebar from './AdminSidebar'
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCall";

function PostsTable() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  // delete post handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOK) => {
      if (isOK) {
        dispatch(deletePost(postId))
      }
    });
  }
  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>cout</th>
              <th>user</th>
              <th>post title</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={index+1}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img src={item.user.profilePhoto?.url} alt="img" className="table-user-image" />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>view porfile</Link>
                    </button>
                    <button onClick={() => deletePostHandler(item._id)}>delete post</button>
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

export default PostsTable;