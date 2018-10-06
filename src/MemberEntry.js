import React from "react";
import "./MemberList.css";
import { Link, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const MemberEntry = props => {
  const { userData } = props;

  const handleClick = (e, id) => {
    e.preventDefault();
    return props.deleteUser(id);
  };

  const handleUserSelect = (id, e) => {
    e.stopPropagation(); // doesn't seem to be working
    // if (e.currentTarget.className === "selected-user") {
    //   e.currentTarget.classList.remove("selected-user");
    //   props.handleUserSelect(null);
    // } else {
    //   document
    //     .querySelectorAll(".selected-user")
    //     .forEach(item => item.classList.remove("selected-user"));
    //   e.currentTarget.classList.add("selected-user");
    // }
    return props.handleUserSelect(id);
  };

  return userData.map(({ match, firstname, lastname, email, id }) => (
    <tr key={id} onClick={handleUserSelect.bind(this, id)}>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>
        <a
          href=""
          style={{ color: "red", paddingRight: "1rem" }}
          onClick={e => handleClick(e, id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </a>
        <Link to="/update" style={{ color: "black" }}>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </td>
    </tr>
  ));
};

export default MemberEntry;

// const style = {
//   link: {
//     textDecoration: "none",
//     color: "gray"
//   }
// };
