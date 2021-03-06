import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
// Redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    ) : this.likedPost() ? (
      <Button onClick={this.unlikePost}>Unlike</Button>
    ) : (
      <Button onClick={this.likePost}>Like</Button>
    );
    return likeButton;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
