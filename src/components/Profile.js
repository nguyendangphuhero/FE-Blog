import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Form } from "react-bootstrap";
import UploadFile from "./UploadFile";
const Profile = () => {
  const { loading, error, data } = useQuery(gql`
    {
      me {
        id
        username
        email
        firstName
        lastName
        avatar
        bio
        posts {edges{
          node{
            id
            title
            url
          }
        }
      }
      }
    }
  `);
  if (loading) return <h1>Loading...</h1>;
  //console.log(data.me.id);
  if (error) return <h1>Error...</h1>;
  //console.log(data);
  return (
    <Container>
      <Row>
          <p></p>
          <Col>
       <img src={data.me.avatar} alt="profils pic" />
       </Col>
        <Col>
          <h1>User Profile</h1>
          <Form className="form">
            <Form.Group controlId="formCategory1">
              <Form.Label>Username:</Form.Label>
              <p>{data.me.username}</p>
            </Form.Group>
            <Form.Group controlId="formCategory2">
              <Form.Label>Email:</Form.Label>
              <p>{data.me.email}</p>
              <Form.Label>Name:</Form.Label>
              <p>{data.me.firstName} {data.me.lastName}</p>
            </Form.Group>

          </Form>
        </Col>
      </Row>
      <Row>
        <UploadFile></UploadFile>
      </Row>
    </Container>
  );
};
export default Profile;
