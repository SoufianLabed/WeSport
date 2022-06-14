import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <View className="container">
        <View className="jumbotron">
          <View>
                 {currentUser.username} Profile
          </View>
        </View>
        <p>
          <View>Token:</View>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <View>Id:</View>{" "}
          {currentUser.id}
        </p>
        <p>
          <View>Email:</View>{" "}
          {currentUser.email}
        </p>
        <View>Authorities:</View>

          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}

      </View>
    );
  }
}