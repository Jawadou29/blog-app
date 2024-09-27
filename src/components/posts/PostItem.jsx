import React from 'react'
import { Link } from 'react-router-dom'

function PostItem({post, username, userId}) {
  const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`;
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={post?.image.url} className='post-item-image' alt='img' />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link className='post-item-username' to={profileLink}>
              {username ? username : post?.user.username}
              </Link>
          </div>
          <div className="post-item-date">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link className='post-item-category' to={`/posts/categories/${post?.category}`}>{post.category}</Link>
        </div>
        <p className="post-item-description">
          {post?.description}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Error neque delectus eaque repudiandae laboriosam
          maxime consequuntur perferendis explicabo
          quis dolor quos doloribus quibusdam optio similique, 
          veritatis a asperiores, ab suscipit!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Error neque delectus eaque repudiandae laboriosam
          maxime consequuntur perferendis explicabo
          quis dolor quos doloribus quibusdam optio similique, 
          veritatis a asperiores, ab suscipit!
        </p>
        <Link className='post-item-link' to={`/posts/details/${post?._id}`}>
          Read More ...
        </Link>
      </div>
    </div>
  )
}

export default PostItem