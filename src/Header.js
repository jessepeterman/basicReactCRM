import React from "react";

const Header = ({ numOfMembers }) => {
  return (
    <div className="landing-heading">
      <h1 className="landing-title">Org Membership</h1>
      <h4 className="landing-subtitle">
        Keep track of your org in one place ({numOfMembers} active members)
      </h4>
    </div>
  );
};

export default Header;
