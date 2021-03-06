import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import Header from "./Header";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import MemberList from "./MemberList";
import CircularProgress from "@material-ui/core/CircularProgress";
import spinner from "./spinner-91.gif";
// import url from "./app-config";
import TableTest from "./TableTest";
import Nav from "./Nav";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";
import "./App.css";

const url = process.env.REACT_APP_DATABASE_URL;
const corsURL = process.env.REACT_APP_CORSURL + "/" + process.env.PORT;

// console.log(process.env);

class MainApp extends React.Component {
  state = {
    users: null,
    selectedUser: null,
    redirectHome: false
  };

  updateData = () => {
    console.log("fetch data");
    fetch(url + `/users`, {
      mode: "cors"
    })
      .then(res => {
        return res.json();
      })
      .then(users => {
        this.setState({ users: users.rows, redirectHome: false });
        console.log(users.rows);
        return users;
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.updateData();
  }

  createUser = data => {
    fetch(url + `/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => this.updateData())
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    fetch(url + `/users/${id}`, { method: "Delete" })
      .then(res => this.updateData())
      .catch(err => console.log(err));
  };

  handleUserSelect = id => {
    let user = this.state.users.filter(user => user.id === id);
    this.setState({ selectedUser: user[0] });
  };

  render() {
    return (
      <Router>
        <div>
          {/* <Header numOfMembers={this.state.users && this.state.users.length} /> */}
          <Nav />
          <Switch>
            <Route exact path="/">
              {this.state.users && this.state.users.length > 0 ? (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.updateData}
                    style={{ left: "1rem", marginTop: "1rem" }}
                  >
                    <NavLink
                      to="/create"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Create New User
                    </NavLink>
                  </Button>
                  <MemberList
                    handleUserSelect={this.handleUserSelect}
                    userData={this.state.users}
                    deleteUser={this.deleteUser}
                  />
                </div>
              ) : this.state.users && this.state.users.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "40vh"
                  }}
                >
                  <b>No users found</b>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.updateData}
                    style={{ left: "1rem", marginTop: "1rem" }}
                  >
                    <NavLink
                      to="/create"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Create New User
                    </NavLink>
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "40vh"
                  }}
                >
                  <CircularProgress
                    color="primary"
                    size={55}
                    variant="indeterminate"
                  />
                  {/* <img
                    style={{
                      width: 50,
                      height: 50
                    }}
                    src={spinner}
                    alt="laoding..."
                  /> */}
                </div>
              )}
            </Route>
            <Route path="/create">
              {/* <CreateUser createUser={this.createUser} /> */}
              <CreateUserForm
                createUser={this.createUser}
                updateData={this.updateData}
              />
            </Route>
            <Route path="/update">
              {/* <UpdateUser selectedUser={this.state.selectedUser} /> */}
              <UpdateUserForm
                selectedUser={this.state.selectedUser}
                updateData={this.updateData}
              />
            </Route>
            <Route path="/table">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Card />
                <TableTest />
              </Grid>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainApp;

// const style = {
//   table: {
//     width: "10rem",
//     textAlign: "left"
//   }
// };
