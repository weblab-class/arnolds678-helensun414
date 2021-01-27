import React, { Component } from "react";

import {get, post} from "../../utilities.js"

import "./Tag.css"
// import NewTag from "./NewTagInput";

// const value = {NewTag}

class Tag extends Component {
    constructor(props){
        super(props);
        this.state={
            completed: false,
        }
    }

    // handleTag = (e, value) => {
    //     const element = event.target;
    //     value[value].crossLine(value, 1);
    //     this.setState({ value: value});
    // };

    // deleteTag = (value) => {
    //     var value = this.state.value;
    //     value.splice(value, 1);
    //     this.setState({ value: value});
    // };

    completeTask = (event) =>{
        const body = {
            userId: this.props.userId,
            creator_id: this.props.creator_id,
            creator_name: this.props.creator_name,
            parent: this.props.parent,
            content: this.props.content,
        }
        post("/api/achievements", body).then((msg) => {
            if(msg.content === "already achieved"){
                alert("You have already achieved this task!");
            }
        });

        this.setState({
            completed: true,
        })

        
    };

    componentDidMount(){
        get("/api/achievements", {userId: this.props.userId}).then((achievementObjs) => {
            achievementObjs.map((achievementObj) => {
              if(achievementObj.content === this.props.content && achievementObj.parent === this.props.parent){
                  this.setState({completed: true});
              }
            });
        });
    }

    render(){
        let completion = null;
        let buttonClass = "";
        if(!this.state.completed){
            completion = <div>{this.props.content}</div>
            buttonClass = "uncompleted";
        }
        else{
            completion = <del>{this.props.content}</del>
            buttonClass = "completed";
        }

        return(
            <div className="tag">
                <div className = "indiv-tag">
                    {completion}
                    <div className = "tag-creator">
                        Created By: {this.props.creator_name}
                    </div>
                </div>
                <button
                    type='button'
                    value='complete'
                    onClick={this.completeTask}
                    className={buttonClass}
                >
                </button>
            </div>
        ) 
    }
}

export default Tag;