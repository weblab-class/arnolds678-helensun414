import React, { Component } from "react";
import Tag from "./Tag.js";
import NewTag from "./NewTagInput.js";

import "./TagBlock.css";

class TagBlock extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="tagBlock">
                {this.props.tags.map((tag) => (
                    <Tag
                    key={`Tag_${tag._id}`}
                    _id={tag._id}
                    creator_name={tag.creator_name}
                    creator_id={tag.creator_id}
                    content={tag.content}
                    completed={tag.completed}
                    />
                ))}

                <NewTag herdId={this.props.herd._id} addNewTag={this.props.addNewTag} />
            
                
            </div>
        );
        
    }
}

export default TagBlock;