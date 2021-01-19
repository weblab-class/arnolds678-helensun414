import React, { Component } from "react";
import NewTaskInput from "./NewTaskInput.js";

import { post } from "../../utilities.js"

class NewHerd extends Component {
    // constructor(props) {
    //     super(props);
    // }

    addHerd = (value) => {
        const body = { content: value };
        post("/api/herd", body).then((herd) => {
            this.props.addNewHerd(herd);
        });
    };

    render() {
        return <NewTaskInput defaultText="New Herd" onSubmit={this.addHerd} />;
    }
}

export default NewHerd;