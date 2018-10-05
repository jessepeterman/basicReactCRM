import React from "react";
import "./MemberList.css";
import { Link, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
library.add(faCheckSquare, faCoffee);

const MemberEntry = props => {
  console.log({ entryProps: props });
  const { userData } = props;

  const handleClick = (e, id) => {
    e.preventDefault();
    return props.deleteUser(id);
  };

  const handleUserSelect = (id, e) => {
    e.stopPropagation(); // doesn't seem to be working
    return props.handleUserSelect(id);
  };

  return userData.map(({ match, firstname, lastname, email, id }) => (
    <tr key={id} onClick={handleUserSelect.bind(this, id)}>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>{email}</td>

      <td>
        <a href="" onClick={e => handleClick(e, id)}>
          X
        </a>
      </td>
      <td>
        <Link to="/update/:id" style={{ color: "green" }}>
          <FontAwesomeIcon icon={faCoffee} />
        </Link>
        {/* <FontAwesomeIcon icon={["fab", "apple"]} /> */}
        {/* <Link style={style.link} to={`update/${id} `}>
            <FontAwesomeIcon icon="edit" />
          </Link> */}
      </td>
    </tr>
  ));
};

export default MemberEntry;

const style = {
  link: {
    textDecoration: "none",
    color: "gray"
  }
};
