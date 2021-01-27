import React, {Component} from "react";
import FollowedHerd from "./FollowedHerd.js";
import "./HerdList.css";

class HerdList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        let herdsList = null;
        const followingHerds = this.props.followedHerds.length !== 0;
        if(followingHerds){
            herdsList = this.props.followedHerds.map((herdObj) => (
                <FollowedHerd
                    key={`Herd_${herdObj._id}`}
                    _id={herdObj._id}
                    creator_name={herdObj.creator_name}
                    creator_id={herdObj.creator_id}
                    content={herdObj.content}
                    userId={this.props.userId}
                />
            ))
        }
        else{
            herdsList = <div>Not following any Herds!</div>
        }
        return(
            <div className="herdList-container">
                <h3>List of followed Herds: </h3>
                {herdsList}
            </div>
            
        )
    }
}

export default HerdList;