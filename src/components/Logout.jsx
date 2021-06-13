import React from 'react'
import  {GoogleLogout} from "react-google-login";
import {Redirect} from 'react-router-dom';

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
        
              <GoogleLogout
                  clientId="476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com"
                  render = {renderProps => (
                      
                    <p style={{color:'red', fontSize:11}} onClick={renderProps.onClick}>התנתק/י</p>
                      
            )}
                  onLogoutSuccess={this.logout}
                  onLogoutFailure={(response) => console.log(response)}
                >
                </GoogleLogout>
       )
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