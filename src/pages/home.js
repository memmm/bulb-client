import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../util/PostSkeleton";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Post key={post.postId} post={post}></Post>)
    ) : (
      <PostSkeleton />
    );
    return (
      <Container>
        <Row>
          <Col>{recentPostsMarkup}</Col>
          <Col>
            <Profile />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);
