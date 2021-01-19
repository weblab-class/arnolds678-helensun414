import React, {Component} from "react";
import "./Achievements.css";

class Achievements extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        return(
            <div className="achievements-container">
                <h3>List of Achivements: </h3>
                <ul>
                    {this.props.achievements.map((achievement) => (
                        (<li>{achievement}</li>)
                    ))}
                </ul>
            </div>
        );
    }
}

export default Achievements;