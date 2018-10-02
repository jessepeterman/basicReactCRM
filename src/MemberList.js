import React from "react";
import "./MemberList.css";

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
    <tr key={id} onClick={handleUserClick.bind(this, id)}>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>
        <a href="" onClick={e => handleClick(e, id)}>
          X
        </a>
      </td>
    </tr>
  ));
};

export default MemberList;

{
  /* <li key={id} onClick={handleUserClick.bind(this, id)}>
  {firstname} {lastname}: {email}{" "}
  <a href="" onClick={e => handleClick(e, id)}>
    X
      </a>
</li> */
}
