import React from "react";
import "./CreateUser.css";
const url = "http://localhost:8080/api";

class UpdateUser extends React.Component {
  // state = {
  //   firstname: this.props.selectedUser ? this.props.selectedUser.firstname : "",
  //   lastname: this.props.selectedUser ? this.props.selectedUser.lastname : "",
  //   email: this.props.selectedUser ? this.props.selectedUser.email : ""
  // };

  clearInputs = (firstname, lastname, email) => {
    firstname.value = "";
    lastname.value = "";
    email.value = "";
  };

  handleSubmit = e => {
    e.preventDefault();

    const firstname = e.target.elements.firstname;
    const lastname = e.target.elements.lastname;
    const email = e.target.elements.email;

    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value
    };

    fetch(url + `/users/${this.props.selectedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    // this.props.createUser({
    //   firstname: firstname.value,
    //   lastname: lastname.value,
    //   email: email.value
    // });
    this.clearInputs(firstname, lastname, email);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="create-user-form">
          <label>Update User Info</label>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            defaultValue={
              this.props.selectedUser ? this.props.selectedUser.firstname : ""
            }
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            defaultValue={
              this.props.selectedUser ? this.props.selectedUser.lastname : ""
            }
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={
              this.props.selectedUser ? this.props.selectedUser.email : ""
            }
          />
          <input type="submit" placeholder="Submit" />
        </form>
      </div>
    );
  }
}

export default UpdateUser;
