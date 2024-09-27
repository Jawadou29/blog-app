import { Link, useNavigate, useParams } from "react-router-dom";
import "./post-details.css";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPost, togglerLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";


function PostDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchPost(id));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  // update image submit handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  }
  // delete post handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`)
      } else {
        swal("something went wrong!");
      }
    });
  }


  return (
    <section className="post-details">
      <div className="image-wrapper">
        <img src={file ? URL.createObjectURL(file) : post?.image.url} className="image" alt="img" />
        {post?.user?._id === user?._id && (
          <form  className="update-post-image-from" onSubmit={updateImageSubmitHandler}>
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>
              Select New image
            </label>
            <input style={{display: "none"}} type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="sumbmit">upload</button>
          </form>
        )}
      </div>
      <h1 className="title">{post?.title}</h1>
      <div className="user-info">
        <img src={post?.user.profilePhoto.url} alt="img" className="user-image" />
        <div className="user">
          <strong>
            <Link id="one" to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="description">
        {post?.description} ?
      </p>
      <div className="icon-wrapper">
        <div>
          {
            user && (
              <i className={post?.likes.includes(user?._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}
                onClick={() => dispatch(togglerLikePost(post?.id))}>
              </i>
            )
          }
          <small>{post?.likes.length} likes</small>
        </div>
        <div>
          {post?.user?._id === user?._id && (
            <>
              <i className="bi bi-pencil-square" onClick={() => setUpdatePost(true)}></i>
              <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
            </>
          )}
        </div>
      </div>
      {
        user ? <AddComment postId={post?._id} /> :
        <div className="post-details-info-write">
          to write a comment you should <Link to="/login">login</Link> first
        </div>
      }
      <CommentList comments={post?.comments} />
      {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}
    </section>
  )
}

export default PostDetails