import React from "react";
import { Link } from "react-router-dom";

const Header = ({ numOfMembers }) => {
  return (
    <div className="landing-heading">
      <Link style={style} to="/">
        <h1 className="landing-title">Org Membership</h1>
      </Link>
      <h4 className="landing-subtitle">
        Keep track of your org in one place ({numOfMembers} active members)
      </h4>
    </div>
  );
};

export default Header;

const style = {
  textDecoration: "none"
};
