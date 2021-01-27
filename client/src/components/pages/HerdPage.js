import React, { Component } from "react";
import { get } from "../../utilities.js";
import Herd from "../modules/Herd.js";
import "./HerdPage.css";

class HerdPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            herd: undefined,
        }
    }

    componentDidMount(){
        document.title = "Herd Page";
        const herdId = this.props.location.state.herdId;
        get(`/api/herd`, { _id: herdId }).then((herd) => this.setState({ herd: herd }));
    }

    render(){
        if(!this.state.herd){
            return <div>Loading!</div>
        }
        return(
            <div className = "herdPage">
                <Herd 
                    key={`Herd_${this.state.herd._id}`}
                    _id={this.state.herd._id}
                    creator_name={this.state.herd.creator_name}
                    creator_id={this.state.herd.creator_id}
                    content={this.state.herd.content}
                    userId={this.props.userId}
                    className="herdPage"
                    headerClassName="pageHeader"
                    tagBlockClassName="pageContent"
                />
            </div>
        )
    }


}

export default HerdPage;