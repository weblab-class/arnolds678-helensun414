import React, { Component } from "react";
import HerdHeader from "./HerdHeader.js";
import "./FollowedHerd.css";

class FollowedHerd extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="followedHerd">
                <HerdHeader 
                    _id={this.props._id}
                    creator_name={this.props.creator_name}
                    creator_id={this.props.creator_id}
                    content={this.props.content}
                />
                {/* {this.props.content} */}
            </div>
        )
    }
}

export default FollowedHerd;