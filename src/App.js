import React from "react";
import "./App.css";
import Header from "./Header";
import MemberList from "./MemberList";
import CreateUser from "./CreateUser";
import spinner from "./spinner-91.gif";
import UpdateUser from "./UpdateUser";
import url from "./app-config";

class App extends React.Component {
  state = {
    users: null,
    isLoading: false,
    currentUser: null
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
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    fetch(url + `/users/${id}`, { method: "Delete" }).then(res =>
      this.updateData()
    );
  };

  handleUserClick = id => {
    let user = this.state.users.filter(user => user.id === id);
    this.setState({ currentUser: user[0] });
    console.log(id);
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
          <div>
            <table>
              <tbody>
                <tr>
                  <th style={style.table}>First Name</th>
                  <th style={style.table}>Last Name </th>
                  <th style={style.table}>Email</th>
                  <th style={style.table}>Delete</th>
                </tr>
                <MemberList
                  userData={this.state.users}
                  deleteUser={this.deleteUser}
                  handleUserClick={this.handleUserClick}
                />
              </tbody>
            </table>
          </div>
        )}
        <button onClick={this.updateData}>Update Data</button>
        <UpdateUser selectedUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;

const style = {
  table: {
    width: "10rem",
    textAlign: "left"
  }
};
