import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import GoogleLogin from "react-google-login";
import { Link, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {extractUserData} from "./googleApi/GoogleApi";
import {setCurState, setUserData} from '../redux/actions'



const loginFailureHandler = (response) => {
    console.log(response);
    // TODO what to do if login fails?

  }



const LoginTrainer = (props) => {


    if (props.currentState === "trainer") {
        return <Redirect to="/TrainerPage"/>;
    }

    return(
        <div>
            <GoogleLogin
            clientId="476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com"
            render = {renderProps => (
                <Button variant="outline-primary" href="/TrainerPage" size="lg" onClick={renderProps.onClick} disable = {renderProps.disabled} >
                    כניסת מאמנים</Button>
            )}
            buttonText={''}
            onSuccess={(response) =>
                {
                    const userData = extractUserData(response);
                    props.setCurState("trainer");
                    props.setUserData(userData);


                }
            }
            onFailure={loginFailureHandler}
            cookiePolicy={'single_host_origin'}
            />
        </div>)
}



const actionsCreators = {
    setUserData: setUserData,
    setCurState: setCurState,

}

const mapStateToProps = (state) => ({
    authenticationData: state.authenticationData,
    currentState: state.currentState,

});

export default connect(mapStateToProps, actionsCreators)(LoginTrainer);