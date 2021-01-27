import React, { Component } from "react";
import NewTaskInput from "./NewTaskInput.js";

import { post } from "../../utilities.js";

class NewTag extends Component {
  constructor(props) {
    super(props);
  }

  addTag = (value) => {
    const body = { parent: this.props.herdId, content: value };
    post("/api/tags", body).then((tag) => {
      if (tag.content === "tag already exists") {
        alert("The tag you are trying to add already exists!");
      } else {
        this.props.addNewTag(tag);
      }
    });
  };

  render() {
    return <NewTaskInput defaultText="New Tag" onSubmit={this.addTag} />;
  }
}

export default NewTag;
