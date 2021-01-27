import React, { Component } from "react";
import NewTaskInput from "./NewTaskInput.js";

import { post } from "../../utilities.js";

class NewHerd extends Component {
  // constructor(props) {
  //     super(props);
  // }

  addHerd = (value) => {
    const body = { content: value };
    post("/api/herd", body).then((herd) => {
      if (herd.content === "herd already exists") {
        alert("The herd you are trying to add already exists!");
      } else {
        this.props.addNewHerd(herd);
      }
    });
  };

  render() {
    return (
      <div className="add-new-herd">
        <NewTaskInput defaultText="add new herd" onSubmit={this.addHerd} />
      </div>
    );
  }
}

export default NewHerd;
