import React, { Component } from "react";
import axios from "axios";
import Post from "../components/Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    axios.get("/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  }
  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map(post => <Post key={post.postId} post={post}></Post>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Container>
        <Row>
          <Col>{recentPostsMarkup}</Col>
          <Col>Profile...</Col>
        </Row>
      </Container>
    );
  }
}

export default home;
