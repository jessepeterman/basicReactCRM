import React from "react";

const MemberList = props => {
  const { userData } = props;
  const handleClick = (e, id) => {
    e.preventDefault();
    return props.deleteUser(id);
  };

  const handleUserClick = (id, e) => {
    e.stopPropagation(); // doesn't seem to be working
    return props.handleUserClick(id);
  };

  return userData.map(({ firstname, lastname, email, id }) => (
    <li key={id} onClick={handleUserClick.bind(this, id)}>
      {firstname} {lastname}: {email}{" "}
      <a href="" onClick={e => handleClick(e, id)}>
        X
      </a>
    </li>
  ));
};

export default MemberList;
