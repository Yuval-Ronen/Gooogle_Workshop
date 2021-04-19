import React, {useState} from 'react'
import GoogleLogin, {GoogleLogout} from "react-google-login";
import { Link, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {BsClockHistory, BsPeopleCircle} from "react-icons/bs";
import {setCurState, setUserData} from "../redux/actions";
import {connect} from "react-redux";

// const [name, setName] = useState("");
// const [url, setUrl] = useState("");


class Logout extends React.Component{

    state = {
        loggedOut: false,
    }


    constructor(props) {
        super(props);
        console.log(props)
    }



    logout = () => {
                console.log("logged out!")
                this.props.setUserData({})
                this.props.setCurState("")

                this.setState(
                    {loggedOut: true,}
                    )

    }

    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/"/>;
        }
        return(
        <div>
              <GoogleLogout
                  clientId="476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com"
                  render = {renderProps => (
                      <Nav.Item>
                          <Nav.Link eventKey="fifth" onClick={renderProps.onClick}>התנתק/י מהחשבון <BsPeopleCircle/></Nav.Link>
                      </Nav.Item>
            )}
                  onLogoutSuccess={this.logout}
                  onLogoutFailure={(response) => console.log(response)}
                >
                </GoogleLogout>
        </div>)
    }
}


const actionsCreators = {
    setUserData: setUserData,
    setCurState: setCurState,

}

const mapStateToProps = (state) => ({
    authenticationData: state.authenticationData,
    currentState: state.currentState,

});

export default connect(mapStateToProps, actionsCreators)(Logout);