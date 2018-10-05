import React from "react";
import { Route, Link } from "react-router-dom";

const Users = ({ data }) => {
  return data.map((user, index) => (
    <li key={index}>
      <b>{user.name}: </b>
      {user.occupation}
    </li>
  ));
};

export default Users;
