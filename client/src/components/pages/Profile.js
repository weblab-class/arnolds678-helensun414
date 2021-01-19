//The profile page

import React, { Component } from "react";
import { get } from "../../utilities.js";
import Person from "../modules/Person.js";
import HerdList from "../modules/HerdList.js";
import Achievements from "../modules/Achievements.js";

import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      //hard code for now
      personalHerds: ["wow", "big brain", "horse"],
      achievements: ["be a horse", "pass a class", "eat nuggets"],
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <nav className="Profile-container">
        <div className="Person">
          <Person user={this.state.user} className="Person" />{" "}
        </div>
        <div className="HerdList">
          <HerdList
            user={this.state.user}
            personalHerds={this.state.personalHerds}
            className="HerdList"
          />{" "}
        </div>
        <div className="Achievements">
          <Achievements user={this.state.user} achievements={this.state.achievements} />{" "}
        </div>
        <div className="Profile-title">settings</div>
      </nav>
    );
  }
}

export default Profile;
