import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

const PostSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <img src={NoImg} alt="no upload" />
      <div className={classes.handle} />
      <div className={classes.date} />
      <div className={classes.fullLine} />
      <div className={classes.fullLine} />
      <div className={classes.halfLine} />
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default PostSkeleton;
