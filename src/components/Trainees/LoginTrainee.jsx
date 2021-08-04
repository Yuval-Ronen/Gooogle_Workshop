import GoogleLogin from "react-google-login";
import {Redirect} from 'react-router-dom';
import {setUserData, setCurState} from "../../redux/actions";
import {connect} from "react-redux";
import {extractUserData} from "../googleApi/GoogleApi";
import serverConnector from "../../server-connector";
import {useLocalStorage} from "../../UtillHook";
import React from "react";
import StyledButton from "../personal_progress/Empowerment"


const loginFailureHandler = (response) => {
    console.log(response);
  }

const LoginTrainee = (props) => {
    // eslint-disable-next-line 
    const [userInfo, setUserInfo] = useLocalStorage("userInfo",{});
    // eslint-disable-next-line 
    const [googlePic, setGooglePic] = useLocalStorage("googlePic",'');

   if (props.currentState === "trainee") {
        return <Redirect to="/TraineesPage"/>;
    }

    return(
        <div>
            <GoogleLogin
            clientId="476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com"
            render = {renderProps => (
                <StyledButton className={"login_trainer"}  href="/TrainerPage"  onClick={renderProps.onClick} disable = {renderProps.disabled} 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                    width:'240px'
                    }} >
                    כניסת מתאמנים</StyledButton>
            )}
            buttonText={''}
            onSuccess={async (response) =>
                {
                    const userDataFromGoogle = extractUserData(response);
                    const userDataFromServer = await serverConnector.checkIfTrainee(userDataFromGoogle.email);
                    if(userDataFromServer.ID !== undefined){ // user found as trainer.
                        console.log("user is trainee:");
                        console.log(userDataFromServer);
                        setUserInfo(userDataFromServer);
                        setGooglePic(userDataFromGoogle.imageUrl)
                        props.setCurState("trainee");
                        props.setUserData(userDataFromGoogle);
                    } else {
                        console.log("user is not trainer:");
                    }
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