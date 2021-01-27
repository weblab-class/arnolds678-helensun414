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
      followedHerds: [],
      achievements: [],
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));

    get("/api/followedHerds").then((herdObjs) =>{
      herdObjs.map((herdObj) => {
        this.setState({followedHerds: this.state.followedHerds.concat([herdObj])});
      });
    });

    get("/api/achievements", {userId: this.props.userId}).then((achievementObjs) => {
      achievementObjs.map((achievementObj) => {
        this.setState({achievements: this.state.achievements.concat([achievementObj])});
      });
    });

    // get("/api/achievements").then((achievementObjs) => {
    //   achievementObjs.map((achievementObj) => {
    //     this.setState({achievements: this.state.achievements.concat([achievementObj])});
    //   });
    // });
  }

  followNewHerd = (herdObj) => {
    this.setState({
        followedHerds: [herdObj].concat(this.state.followedHerds),
    });
  };

  achieve = (achievementObj) => {
    this.setState({
      achievements: [achievementObj].concat(this.state.achievements),
    });
  };

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <nav className="Profile-container">
        <div className="Person">
          <Person user={this.state.user} />{" "}
        </div>
        <div className="HerdList">
          <HerdList
            user={this.state.user}
            followedHerds={this.state.followedHerds}
            followNewHerd={this.followNewHerd}
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
