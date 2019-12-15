import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
      }
    } = this.props;
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={userImage} />
        <Card.Body>
          <Card.Title>
            <Link to={`/users/${userHandle}`}>{userHandle}</Link> : {postId}{" "}
            {dayjs(createdAt).fromNow()}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>{body}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Link href="#">{likeCount}</Card.Link>
          <Card.Link href="#">{commentCount}</Card.Link>
        </Card.Footer>
      </Card>
    );
  }
}

export default Post;
