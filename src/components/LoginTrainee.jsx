import React, {useState} from 'react'
import GoogleLogin from "react-google-login";
import { Link, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {setUserData, setCurState} from "../redux/actions";
import {connect} from "react-redux";
import {extractUserData} from "./googleApi/GoogleApi";


const loginFailureHandler = (response) => {
    console.log(response);
    // TODO what to do if login fails?

  }


const LoginTrainee = (props) => {

   if (props.currentState === "trainee") {
        return <Redirect to="/TrainingPage"/>;
    }
    // if (props.authenticationData.email && props.currentState === "trainee") {
    //     return <Redirect to="/TrainingPage"/>;
    // }

    return(

        <div>
            <GoogleLogin
            clientId="476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com"
            render = {renderProps => (
                <Button variant="outline-primary" href="/TrainingPage" size="lg" onClick={renderProps.onClick} disable = {renderProps.disabled} >
                    כניסת מתאמנים</Button>
            )}
            buttonText={''}
            onSuccess={(response) =>
                {
                    console.log("got google login response")
                    console.log(response)
                    const userData = extractUserData(response);
                    props.setCurState("trainee");
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

export default connect(mapStateToProps, actionsCreators)(LoginTrainee);