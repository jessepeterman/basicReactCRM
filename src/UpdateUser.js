import React from "react";

const url = process.env.REACT_APP_DATABASE_URL;

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

    if (this.props.selectedUser && this.props.selectedUser.id) {
      fetch(url + `/users/${this.props.selectedUser.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      this.clearInputs(firstname, lastname, email);
    } else {
      alert("Cannot update without valid ID");
    }

    // redirect to homepage
  };

  render() {
    console.log(this.props.selectedUser);
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
