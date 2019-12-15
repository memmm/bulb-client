import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

// Redux stuff
import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    // this.props.getPost(this.props.post.postId);
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props.post;
    const newPath = `/users/${userHandle}/post/${postId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.post.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      UI: { loading },
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      }
    } = this.props;

    const dialogMarkup = loading ? (
      <div>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </div>
    ) : (
      <Container>
        <Row>
          <Col item sm={5}>
            <img src={userImage} alt="Profile" />
          </Col>
          <Col item sm={7}>
            <Link to={`/users/${userHandle}`}>
              <h5>@{userHandle}</h5>
            </Link>

            <hr />
            <p>{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}</p>
            <hr />
            <p>{body} </p>
            <LikeButton postId={postId} />
            <span>{likeCount} likes</span>
            <Button tip="comments"></Button>
            <span>{commentCount} comments</span>
          </Col>
          <hr />
          <CommentForm postId={postId} />
          {/* <Comments comments={comments} /> */}
        </Row>
      </Container>
    );
    return (
      <Fragment>
        <Button onClick={this.handleOpen} tip="Expand post"></Button>
        <Modal.Dialog open={this.state.open} onClose={this.handleClose}>
          <Button tip="Close" onClick={this.handleClose}></Button>
          <Modal.Body>{dialogMarkup}</Modal.Body>
        </Modal.Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.data,
  UI: state.UI
});

export default connect(mapStateToProps, { getPost, clearErrors })(PostDialog);
