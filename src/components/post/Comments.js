import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Row>
                <Col sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Col>
                <Col item sm={9}>
                  <div className={classes.commentData}>
                    <Link to={`/users/${userHandle}`}>
                      <h5>{userHandle}</h5>
                    </Link>
                    <span>
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </span>
                    <hr className={classes.invisibleSeparator} />
                    <p>{body}</p>
                  </div>
                </Col>
              </Row>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Container>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comments;
