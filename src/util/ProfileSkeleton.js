import React from "react";
import NoImg from "../images/no-img.png";

import Card from "react-bootstrap/Card";

const ProfileSkeleton = props => {
  return (
    <Card>
      <div>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div />
          <hr />
          <div />
          <div />
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

export default ProfileSkeleton;
