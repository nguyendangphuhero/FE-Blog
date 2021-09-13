import React from 'react';
import { Link } from 'react-router-dom';
import './PostItem.css';

const PostList = ({ post }) => {
  const { url, title, pub_date, like } = post;

  const date = new Date(pub_date);
  const option = { month: 'short', day: 'numeric' };
  const dateFormat = date.toLocaleDateString('en-US', option);

  return (
    <div className="post-container">
      <Link to={`blog/${url}`}>
        <div className="post-title">{title}</div>
      </Link>

      <div>
        <span className="post-detail">{`${dateFormat} - `}</span>
        <span className="post-detail">
          {like === 0 ? `0 like` : `${like} likes`}
        </span>
      </div>
    </div>
  );
};

export default PostList;
