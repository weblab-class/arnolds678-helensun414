import React, {Component} from "react";
import SingleAchievement from "./SingleAchievement.js";
import "./Achievements.css";


class Achievements extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        let achievementList = null;
        const hasAchievements = this.props.achievements.length !== 0;
        if(hasAchievements){
            achievementList = this.props.achievements.map((achievementObj) => (
                <SingleAchievement 
                    content={achievementObj.content}
                    key={`Achievement_${achievementObj._id}`}
                    _id={achievementObj._id}
                    creator_name={achievementObj.creator_name}
                    creator_id={achievementObj.creator_id}
                    userId={achievementObj.userId}
                    parent={achievementObj.parent}
                />
            ))
        }
        else{
            achievementList = <div>No Achievements</div>
        }
        return(
            <div className="achievements-container">
                <h3>List of Achivements: </h3>
                {achievementList}
            </div>
        );
    }
}

export default Achievements;