import PostList from "../../components/posts/PostList";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">welcome to blog</h1>
        </div>
      </div>
      <div className="home-latest-post">latest posts</div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">See all posts</Link>
      </div>
    </section>
  )
}

export default Home;