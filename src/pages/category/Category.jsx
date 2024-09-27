import { useParams, Link } from "react-router-dom"
import PostList from "../../components/posts/PostList";
import "./category.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";


function Category() {
  const dispatch = useDispatch();
  const { postsCate } = useSelector(state => state.post);
  const {category} = useParams();
  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category))
    window.scrollTo(0, 0)
  }, [category]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section className="category">
      {postsCate.length === 0 ? 
        <>
          <h1 className="category-not-found">
            posts with <span>{category}</span> not found 
          </h1>
          <Link to="/posts" className="categoty-not-found-link">
            go to posts page
          </Link>

        </>
        :
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <div className="posts">
            <PostList posts={postsCate} className="posts"/>
          </div>
        </>
      }
    </section>
  )
}

export default Category