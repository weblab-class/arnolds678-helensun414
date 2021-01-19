import React, { Component } from "react";

import {post} from "../../utilities.js"

import "./Tag.css"
// import NewTag from "./NewTagInput";

// const value = {NewTag}

class Tag extends Component {
    constructor(props){
        super(props);
        this.state={
            completed: false,
        }
        // this.state = {
        //     value: value
        // };
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
        this.setState({
            completed: true,
        });
        post("/api/tags", {completed: true});
    };

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
                </div>
                <button
                    type='button'
                    value='complete'
                    onClick={this.completeTask}
                    className={buttonClass}
                >
                </button>
            </div>




            // <div className="complete-task">
            //     <input onClick={event => this.handleTag(e, value=this.props.content)}  value= {this.props.content}/>

            //     <button onClick={() => deleteTag(value)}>x</button>
            // </div>
        ) 
    }
}

export default Tag;