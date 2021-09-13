import React from 'react';
import PostItem from './PostItem';
import posts from './data.json';

const { useState, useEffect } = React;

const useQuery = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(posts);
    }, 1000);
  }, []);

  return {
    loading,
    data,
    error,
  };
};

const PostList = () => {
  const { loading, error, data } = useQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data != null && data.length > 0) {
    return (
      <div>
        {data.map((post) => (
          <PostItem post={post} />
        ))}
      </div>
    );
  }

  return <div>Somethings went wrong!</div>;
};

export default PostList;
