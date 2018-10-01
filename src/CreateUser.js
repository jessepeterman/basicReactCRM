import React from "react";
import "./CreateUser.css";

const CreateUser = props => {
  const clearInputs = (firstname, lastname, email) => {
    firstname.value = "";
    lastname.value = "";
    email.value = "";
  };

  const handleSubmit = e => {
    e.preventDefault();
    const firstname = e.target.elements.firstname;
    const lastname = e.target.elements.lastname;
    const email = e.target.elements.email;
    props.createUser({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value
    });
    clearInputs(firstname, lastname, email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-user-form">
        <label>Create New User</label>
        <input type="text" name="firstname" placeholder="First name" />
        <input type="text" name="lastname" placeholder="Last name" />
        <input type="text" name="email" placeholder="Email" />
        <input type="submit" placeholder="Submit" />
      </form>
    </div>
  );
};

export default CreateUser;
