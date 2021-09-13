import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import './TagList.css';
import TagList from './TagList';
const Filter = (props) =>{ 
  const slug=props.match.params.id
  const { loading, error, data } = useQuery(gql`
  {
    tags(title: "${slug}"){
      edges{
        node{
          id
          title
          posts{
            edges{
              node{
                id
                title
                url
              }
            }
          }
        }
      }
    }
  }
  `);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  console.log(data.tags.edges[0].node.posts.edges)
  return (   
    <div className='container mt-3'>
      <div className="col-4">
          <TagList />
        </div>
        <div className="nav-scroller py-1 mb-2">
        </div>
            <div className="col-md-6 px-0">
                <div>{data.tags.edges[0].node.posts.edges.map((item,i) =>            
                <div>
                  <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <h3 className="mb-0">{item?.node.title}</h3>
                        <div className="mb-1 text-muted">{item?.node.pubDate} </div>
                        <p className="card-text mb-auto">Like:{item?.node.like}</p>
                        <Link to={`/blog/${item?.node.url}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                    </div>
                </div>
                 </div>
                )}</div>
            </div>
    </div>
);
}
export default Filter;
