import React from 'react'
import { connect } from 'react-redux';
import GoogleLogin from "react-google-login";
import {Redirect} from 'react-router-dom';
import {extractUserData} from "../googleApi/GoogleApi";
import {setCurState, setUserData} from '../../redux/actions'
import serverConnector from '../../server-connector';
import {useLocalStorage} from "../../UtillHook"
import StyledButton from "../personal_progress/Empowerment"




const loginFailureHandler = (response) => {
    // console.log(response);
    // TODO what to do if login fails?
  }

const LoginTrainer = (props) => {
    // eslint-disable-next-line 
    const [userInfo, setUserInfo] = useLocalStorage("userInfo",{});
    // eslint-disable-next-line 
    const [googlePic, setGooglePic] = useLocalStorage("googlePic",'');

    if (props.currentState === "trainer") {
        return <Redirect to="/TrainerPage"/>;
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
}} >
                    כניסת מאמנים  </StyledButton>
            )}
            buttonText={''}
            onSuccess={async (response) =>
                {
                    const userDataFromGoogle = extractUserData(response);
                    const userDataFromServer = await serverConnector.checkIfTrainer(userDataFromGoogle.email);
                    if(userDataFromServer.ID !== undefined){ // user found as trainer.
                        // console.log("user is trainer:");
                        // console.log(userDataFromServer);
                        setUserInfo(userDataFromServer);
                        setGooglePic(userDataFromGoogle.imageUrl)
                        props.setCurState("trainer");
                        props.setUserData(userDataFromGoogle);
                    } else {
                        // console.log("user is not trainer:");

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

export default connect(mapStateToProps, actionsCreators)(LoginTrainer);