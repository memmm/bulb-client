import React from "react";
import PropTypes from "prop-types";
import NoImg from "../images/no-img.png";

import Card from "react-bootstrap/Card";

const ProfileSkeleton = props => {
  const { classes } = props;
  return (
    <Card className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <span>Location</span>
          <hr />
          https://website.com
          <hr />
          Joined date
        </div>
      </div>
    </Card>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ProfileSkeleton;
