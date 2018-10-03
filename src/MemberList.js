import React from "react";
import "./MemberList.css";
import { Link, Redirect } from "react-router-dom";

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

  return userData.map(({ match, firstname, lastname, email, id }) => (
    // <Link to={`${props.match.url}/user`}>
    // <Link to={`${match.url}/${id}`} key={id}>
    <tr key={id} onClick={handleUserClick.bind(this, id)}>
      <td>{firstname}</td>
      <td>{lastname}</td>
      {/* <Redirect to={`/users/${id}`} /> */}

      {/* <Link to={`/user/${id}`} key={id}> */}
      <td>{email}</td>
      <td>
        <a href="" onClick={e => handleClick(e, id)}>
          X
        </a>
      </td>
    </tr>
    // </Link>
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
