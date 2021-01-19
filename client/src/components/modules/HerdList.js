import React, {Component} from "react";
import "./HerdList.css";

class HerdList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){};

    render(){
        return(
            <div className="herdList-container">
                <h3>List of followed Herds: </h3>
                <ul>
                    {this.props.personalHerds.map((herd) => (
                        (<li>{herd}</li>)
                    ))}
                </ul>
            </div>
            
        )
    }
}

export default HerdList;