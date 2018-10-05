import React from "react";
import "./MemberList.css";
import MemberEntry from "./MemberEntry";

const MemberList = props => {
  const { userData } = props;
  const handleClick = (e, id) => {
    e.preventDefault();
    return props.deleteUser(id);
  };

  const handleUserSelect = id => {
    alert("selected");
    return props.handleUserSelect(id);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th style={style.table}>First Name</th>
            <th style={style.table}>Last Name </th>
            <th style={style.table}>Email</th>
            <th style={style.table}>Delete</th>
          </tr>
          <MemberEntry
            userData={userData}
            deleteUser={props.deleteUser}
            handleUserSelect={props.handleUserSelect}
          />
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;

const style = {
  table: {
    width: "10rem",
    textAlign: "left"
  }
};
