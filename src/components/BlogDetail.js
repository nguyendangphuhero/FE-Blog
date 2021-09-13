import { Link } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import './TagList.css';
const BlogDetail = (props) => {
    const slug=props.match.params.id
    const { loading, error, data } = useQuery(gql`
      {
        posts(first: 1, url: "${slug}"){
          edges{
            node{
              id
              title
              isDraft
              content
              url
              tags{
                edges{
                  node{
                    title
                  }
                }
              }
            }
          }
        }
      }
  `);
  if (loading) return <h1>Loding...</h1>;
  if (error) return <h1>Error...</h1>;
  console.log(data.posts.edges[0].node.tags.edges)
    const createBlog = () => {
        return {__html: data.posts.edges[0].node.content}
    };
    return (
        <div className='container mt-3'>
            <h4> {data.posts.edges[0].node.title}</h4>
            <h7> {data.posts.edges[0].node.pubDate}</h7>
            <div className='' dangerouslySetInnerHTML={createBlog()} />

            <div>{data.posts.edges[0].node.tags.edges.map((item,i) =>            
                <div>          
                    <h4 className="tag">{item?.node.title}</h4>
                </div>
            )}</div>
            
            
            <hr />
            <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
    );
};
export default BlogDetail;