//Inside Board.js
import React, { Component } from "react";

import HerdHeader from "./HerdHeader.js"
import TagBlock from "./TagBlock.js"
import { get } from "../../utilities";

import { Link } from "@reach/router";

import "./Herd.css"

class Herd extends Component {
    constructor(props){
        super(props);
        this.state={
            // content: "HerdName",
            tags: [],
        };
    }

    componentDidMount(){
        get("/api/tags", { parent: this.props._id }).then((tags) => {
            this.setState({
                tags: tags,
            });
        });
    }

    addNewTag = (tagObj) => {
        this.setState({
            tags: this.state.tags.concat([tagObj]),
        });
    };


    render(){
        return(
            <div className="herd">
                <HerdHeader 
                    _id={this.props._id}
                    creator_name={this.props.creator_name}
                    creator_id={this.props.creator_id}
                    content={this.props.content}
                />
                <TagBlock
                    herd={this.props}
                    tags={this.state.tags}
                    addNewTag={this.addNewTag}
                    userId={this.props.userId}
                />
            </div>


            // <div>
            //     <h1>
            //         {this.state.content}
            //     </h1>
            //     {/* <ul>
            //         {this.state.tags.map((tag) => (
            //             <li>{tag}</li>
            //         ))}
            //     </ul> */}
            // </div>
        );
    }
}

export default Herd;

