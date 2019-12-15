import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";

import Card from "react-bootstrap/Card";

const PostSkeleton = props => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card key={index}>
      <img src={NoImg} alt="no upload" />
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

export default PostSkeleton;
