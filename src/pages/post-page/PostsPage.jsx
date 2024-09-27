import "./PostsPage.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

function PostPage() {
  const dispatch = useDispatch();
  const { postsCount, posts} = useSelector(state => state.post);
  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(postsCount / POST_PER_PAGE);
  useEffect(() => {
    dispatch(fetchPosts(currentPage))
    window.scrollTo(0, 0);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getPostsCount());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts}/>
        <Sidebar/>
      </section>
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default PostPage