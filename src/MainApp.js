import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";
import MemberList from "./MemberList";
import spinner from "./spinner-91.gif";
import url from "./app-config";
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
    console.log(this.state.users);
    return (
      <Router>
        <div>
          <Header numOfMembers={this.state.users && this.state.users.length} />
          <Switch>
            <Route exact path="/">
              {this.state.users && this.state.users.length > 0 ? (
                <MemberList
                  handleUserSelect={this.handleUserSelect}
                  userData={this.state.users}
                  deleteUser={this.deleteUser}
                />
              ) : (
                <img
                  style={{ width: 35, height: 32 }}
                  src={spinner}
                  alt="laoding..."
                />
              )}
            </Route>
            <Route path="/create">
              <CreateUser createUser={this.createUser} />
            </Route>
            <Route path="/update">
              <UpdateUser selectedUser={this.state.selectedUser} />
            </Route>
          </Switch>
          <button onClick={this.updateData}>Update Data</button>
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
