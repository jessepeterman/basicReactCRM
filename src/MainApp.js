import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import MemberList from "./MemberList";
import CircularProgress from "@material-ui/core/CircularProgress";
import spinner from "./spinner-91.gif";
import url from "./app-config";
import TableTest from "./TableTest";
import Nav from "./Nav";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import "./App.css";

class MainApp extends React.Component {
  state = {
    users: null,
    selectedUser: null
  };

  updateData = () => {
    fetch(url + `/users`) //, { mode: "no-cors" })
      .then(res => {
        return res.json();
      })
      .then(users => {
        this.setState({
          users
        });
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
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    fetch(url + `/users/${id}`, { method: "Delete" }).then(res =>
      this.updateData()
    );
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
                  <MemberList
                    handleUserSelect={this.handleUserSelect}
                    userData={this.state.users}
                    deleteUser={this.deleteUser}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.updateData}
                  >
                    Update Data
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
              <CreateUser createUser={this.createUser} />
            </Route>
            <Route path="/update">
              <UpdateUser selectedUser={this.state.selectedUser} />
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
