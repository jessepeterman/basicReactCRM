import React from "react";
import { Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./App2.css";

const buttonStyle = {
  background: "yellow",
  color: "black"
};

const FormRedesign = props => {
  const handleSubmit = e => {
    e.preventDefault();
    alert("submitted");
  };

  return (
    <div>
      <h1>App test</h1>
      <Button
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
      <hr />
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
        />
        <TextField
          style={{ marginBottom: "1rem" }}
          id="outlined-email"
          label="Email"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormRedesign;
