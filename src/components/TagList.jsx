import React from 'react';
import './TagList.css';
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

const TagList = () => {

  const { loading, error, data } = useQuery(gql`
  {
    tags{
      edges{node
      {
        title
      }
      }
    }
  }  
  `);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  const tags = data.tags.edges.map((item)=>item.node.title);
  //console.log(data.tags.edges)

  return (
    <div>
      {/* <div className="tag-title">Tags</div>       */}
      <div>
        {tags.map((tag) => (
          <Link to={`/filter/${tag}`} className="tag">{tag}</Link>

        ))}
      </div>
    </div>
  );
};

export default TagList;
