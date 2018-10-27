import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import "./CreateUserForm.css";

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

const buttonStyle = {
  background: "yellow",
  color: "black"
};

const CreateUserForm = props => {
  const { classes } = props;
  let isRedirect = false;

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

    console.log(firstname.value, lastname.value, email.value);

    props.createUser({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value
    });

    clearInputs(firstname, lastname, email);
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
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            id="outlined-lastname"
            label="Last Name"
            variant="outlined"
            name={"lname"}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            id="outlined-email"
            label="Email"
            variant="outlined"
            name={"email"}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </CardContent>
      {isRedirect && <Redirect to="/" />}
    </Card>
  );
};

export default withStyles(styles)(CreateUserForm);
