import React from "react";
import "./App.css";
import Header from "./Header";
import MemberList from "./MemberList";
import CreateUser from "./CreateUser";
import spinner from "./spinner-91.gif";
const url = "http://localhost:8080/api";

class App extends React.Component {
  state = {
    users: null,
    isLoading: false
  };

  updateData = () => {
    this.setState({ isLoading: true });
    fetch(url + `/users`) //, { mode: "no-cors" })
      .then(res => {
        return res.json();
      })
      .then(users => {
        this.setState({
          users,
          isloading: false
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
    });
  };

  deleteUser = id => {
    fetch(url + `/users/${id}`, { method: "Delete" }).then(res =>
      this.updateData()
    );
  };

  render() {
    return (
      <div>
        <Header numOfMembers={this.state.users && this.state.users.length} />
        <CreateUser createUser={this.createUser} />
        <br />
        {!this.state.users ||
        (this.state.users.length < 1 && this.isLoading) ? (
          <div>
            <img
              style={{ width: 35, height: 32 }}
              src={spinner}
              alt="laoding..."
            />
          </div>
        ) : (
          <MemberList
            userData={this.state.users}
            deleteUser={this.deleteUser}
          />
        )}
        <button onClick={this.updateData}>Update Data</button>
      </div>
    );
  }
}

export default App;
