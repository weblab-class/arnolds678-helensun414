//Inside Board.js
import React, { Component } from "react";

import HerdHeader from "./HerdHeader.js"
import TagBlock from "./TagBlock.js"
import { get, post } from "../../utilities";

import { Link } from "@reach/router";

import "./Herd.css"

class Herd extends Component {
    constructor(props){
        super(props);
        this.state={
            // content: "HerdName",
            tags: [],
            following: false,
        };
    }

    componentDidMount(){
        get("/api/tags", { parent: this.props._id }).then((tags) => {
            this.setState({
                tags: tags,
            });
        });

        get("/api/followedHerds").then((herdObjs) =>{
            herdObjs.map((herdObj) => {
              if(herdObj.content === this.props.content){
                  this.setState({following: true});
              }
            });
        });
    }

    addNewTag = (tagObj) => {
        this.setState({
            tags: this.state.tags.concat([tagObj]),
        });
    };

    followHerd = (event) => {
        const body = {
            content: this.props.content,
            creator_name: this.props.creator_name,
            creator_id: this.props.creator_id,
            userId: this.props.userId,
        }

        post("/api/followedHerds", body).then((msg) => {
            if(msg.content === "already following"){
                alert("You already follow this herd!");
            }
        });

        this.setState({
            following: true,
        })
    };


    render(){
        let followStatus = null;
        if (this.state.following){
            followStatus = <div>Following!</div>
        }
        else{
            followStatus = 
            <button
                type="button"
                value="follow"
                onClick={this.followHerd}
            >
                follow!
            </button>
        }
        return(
            <div className={this.props.className}>
                <div className="header">
                <HerdHeader 
                    _id={this.props._id}
                    creator_name={this.props.creator_name}
                    creator_id={this.props.creator_id}
                    content={this.props.content}
                    className={this.props.headerClassName}
                />
                <div className="creator">Created by: {this.props.creator_name}</div>
                    {followStatus}
                </div>
                <div>
                <TagBlock
                    herd={this.props}
                    tags={this.state.tags}
                    addNewTag={this.addNewTag}
                    userId={this.props.userId}
                    className={this.props.tagBlockClassname}
                />
                </div>
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

