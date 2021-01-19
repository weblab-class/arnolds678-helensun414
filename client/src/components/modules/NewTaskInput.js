import React, { Component } from "react";
import { post } from "../../utilities.js"


class NewTaskInput extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: "",
        };
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit && this.props.onSubmit(this.state.value);
        this.setState({
            value:"",
        });
    };
    
    render(){
        return(
            <div>
                <input 
                    type="text"
                    placeholder={this.props.defaultText}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button
                    type="submit"
                    value='Submit'
                    onClick={this.handleSubmit}
                >
                    Submit!
                </button>
            </div>
        );
    }
}

// class NewHerd extends Component {
//     // constructor(props) {
//     //     super(props);
//     // }

//     addHerd = (value) => {
//         const body = { content: value };
//         post("/api/herd", body).then((herd) => {
//             this.props.addNewHerd(herd);
//         });
//     };

//     render() {
//         return <NewTaskInput defaultText="New Herd" onSubmit={this.addHerd} />;
//     }
// }


export default NewTaskInput;

