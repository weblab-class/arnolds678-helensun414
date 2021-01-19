import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Login.css";

const GOOGLE_CLIENT_ID = "326978703631-0f5u8bhqftmr3884ug1ar0o36pc12c1h.apps.googleusercontent.com";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="login-format">
        <div className="activiTag">activiTag</div>
        <div className="googleLogin">
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="initialLoginButton"
          />
        </div>
      </nav>
    );
  }
}

export default Login;
