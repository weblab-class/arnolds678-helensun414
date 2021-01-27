import React, { Component } from "react";
import { get } from "../../utilities.js";

import "./Person.css";

class Person extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    if (!this.props.user) {
      return <div> Loading! </div>;
    }
    return (
      <div className="person-container">
        <img
          src="https://cdn3.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumb900.jpg"
          className="profile-pic"
        />
        <div>{this.props.user.name}</div>
      </div>
    );
  }
}

export default Person;
