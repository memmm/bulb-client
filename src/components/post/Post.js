import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
// Redux
import { connect } from "react-redux";

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={userImage} />
        <Card.Body>
          <Card.Title>
            <Link to={`/users/${userHandle}`}>{userHandle}</Link> : {postId}{" "}
            {dayjs(createdAt).fromNow()}
          </Card.Title>
          {deleteButton}
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>{body}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <LikeButton postId={postId} />
          <Card.Link href="#">{likeCount}</Card.Link>
          <Button variant="primary">Comments</Button>
          <Card.Link href="#">{commentCount}</Card.Link>
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </Card.Footer>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Post);
