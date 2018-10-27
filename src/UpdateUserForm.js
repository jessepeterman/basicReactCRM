import React from "react";
// import { Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import "./CreateUserForm.css";

const url = process.env.REACT_APP_DATABASE_URL;

const styles = {
  card: {
    width: 350,
    height: 375,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "2rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

// const buttonStyle = {
//   background: "yellow",
//   color: "black"
// };

const UpdateUserForm = props => {
  const { classes } = props;

  const clearInputs = (firstname, lastname, email) => {
    firstname.value = "";
    lastname.value = "";
    email.value = "";
  };

  const handleSubmit = e => {
    e.preventDefault();
    const firstname = e.target.elements.fname;
    const lastname = e.target.elements.lname;
    const email = e.target.elements.email;

    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value
    };

    if (props.selectedUser && props.selectedUser.id) {
      fetch(url + `/users/${props.selectedUser.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => props.updateData())
        .catch(err => console.log(err));
      clearInputs(firstname, lastname, email);
    } else {
      alert("Cannot update without valid ID");
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <h1>Add new entry</h1>
        {/* <Button
        style={buttonStyle}
        variant="contained"
        color="primary"
        onClick={() => props.alert()}
      >
        Click to Alert
      </Button>
      <Button variant="contained" color="secondary">
        Click
      </Button>
      <hr /> */}
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <TextField
            style={{ marginBottom: "1rem" }}
            id="outlined-firstname"
            label="First Name"
            variant="outlined"
            name={"fname"}
            defaultValue={
              props.selectedUser ? props.selectedUser.firstname : ""
            }
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            id="outlined-lastname"
            label="Last Name"
            variant="outlined"
            name={"lname"}
            defaultValue={props.selectedUser ? props.selectedUser.lastname : ""}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            id="outlined-email"
            label="Email"
            variant="outlined"
            name={"email"}
            defaultValue={props.selectedUser ? props.selectedUser.email : ""}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(UpdateUserForm);
