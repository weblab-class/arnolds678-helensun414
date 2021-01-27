import React, {Component} from "react";

class SingleAchievement extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div>
                {this.props.content}
                </div>
     
                {/* <div>
                these are userIds:
                {this.props.userId}
                </div>
                
                <div>
                    parent: {this.props.parent}
                </div> */}

            </div>
        )
    }
}

export default SingleAchievement;