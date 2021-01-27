import React, { Component } from "react";
import { Link } from "@reach/router";

import "./HerdHeader.css";

class HerdHeader extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className={this.props.className}>
          <h3>
          <Link to={`/herd/${this.props._id}`} state={{herdId: this.props._id}}>
            {this.props.content}
          </Link>
          {/* {this.props.content} */}
          </h3>
        </div>
      );
    }
  }

  export default HerdHeader;