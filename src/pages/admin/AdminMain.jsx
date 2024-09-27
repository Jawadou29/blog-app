import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddCategoryForm from './AddCategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategories } from '../../redux/apiCalls/categoryApiCall';
import { getUsersCount } from '../../redux/apiCalls/profileApiCall';
import { getPostsCount } from '../../redux/apiCalls/postApiCall';
import { getAllComments } from '../../redux/apiCalls/commentApiCall';

function AdminMain() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { usersCount } = useSelector(state => state.profile);
  const { postsCount } = useSelector(state => state.post);
  const { comments } = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(getAllComments())
  }, [])
  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">users</h5>
          <div className="admin-card-count">{usersCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/users-table"
                  className='admin-card-link'
              >
                see all users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">posts</h5>
          <div className="admin-card-count">{postsCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/posts-table"
                  className='admin-card-link'
              >
                see all posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">categories</h5>
          <div className="admin-card-count">{categories?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/categories-table"
                  className='admin-card-link'
              >
                see all categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">comments</h5>
          <div className="admin-card-count">{comments?.length}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/comments-table"
                  className='admin-card-link'
              >
                see all comments
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm />
    </div>
  )
}

export default AdminMain