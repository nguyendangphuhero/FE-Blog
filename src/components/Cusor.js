import React from 'react';
import './TagList.css';
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
const Cursor = () => {
  const { loading, error, data } = useQuery(gql`
  {
    posts(first:3){
      edges{
        cursor
        node{
          title
          pubDate
          like
          isDraft
          id
        }
      }
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }  
  `);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  //const tags = data.tags.edges.map((item)=>item.node.title);
  //console.log(data.posts.edges[2].cursor)

  return (
    <div>
      {/* <div className="tag-title">Tags</div>      
      <div>
        {tags.map((tag) => (
          <Link to={`/filter/${tag}`} className="tag">{tag}</Link>

        ))}
      </div> */}
       <Link to={`/pagination/${data.posts.edges[2].cursor}`} >Next</Link>
    </div>
  );
};

export default Cursor;
