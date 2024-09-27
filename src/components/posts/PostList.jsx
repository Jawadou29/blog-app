import "./posts.css";
import PostItem from "./PostItem";

function PostList({posts}) {
  return (
    <div className="post-list">
      {
        posts.map(item => <PostItem post={item} key={item._id} />)
      }
    </div>
  )
}

export default PostList