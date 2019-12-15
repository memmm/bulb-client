import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import { deletePost } from "../../redux/actions/dataActions";

class DeletePost extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button
          tip="Delete Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        ></Button>
        <Modal.Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Modal.Title>Are you sure you want to delete this post ?</Modal.Title>
          <Modal.Footer>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="secondary">
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { deletePost })(DeletePost);
