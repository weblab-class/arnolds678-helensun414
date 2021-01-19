import React, { Component } from "react";
import { Link } from "@reach/router";

import "./HerdHeader.css";

class HerdHeader extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="herd-header">
          {/* <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold">
            {this.props.creator_name}
          </Link> */}
          <h3>{this.props.content}</h3>
        </div>
      );
    }
  }

  export default HerdHeader;