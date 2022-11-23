import React from "react";
import { Button } from "react-bootstrap";
import IconText from "../IconText";

const IconButton = ({ onClick, text, icon, ...props }) => {
  return (
    <Button onClick={onClick} className="m-2" {...props}>
      <IconText icon={icon} text={text} left={false} />
    </Button>
  );
};

export default IconButton;
