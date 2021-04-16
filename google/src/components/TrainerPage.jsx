import React from 'react'
import GoogleLogin from "react-google-login";
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import NavBar from "./NavBar";




class TrainerPage extends React.Component{
    state = {
        loggedOut: false,
    }

    constructor(props) {
        super(props);
        console.log(props)
    }

    logout = () => {
                console.log("logged out!")
                this.setState(
                    {loggedOut: true,}
                    )
    }

    render(){
        if (this.state.loggedOut) {
            return <Redirect to="/login"/>;
        }
    return(
        <div>
            <NavBar/>
            <GoogleLogout
              clientId="719857737439-iggm9o7b3302jm31n0dam4i41lc736g8.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.logout}
            >
            </GoogleLogout>

        </div>
    )

    }
}


export default TrainerPage