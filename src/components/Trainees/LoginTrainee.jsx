import GoogleLogin from "react-google-login";
import {Redirect} from 'react-router-dom';
import {Button} from "react-bootstrap";
import {setUserData, setCurState} from "../../redux/actions";
import {connect} from "react-redux";
import {extractUserData} from "../googleApi/GoogleApi";
import serverConnector from "../../server-connector";


const loginFailureHandler = (response) => {
    console.log(response);
    // TODO what to do if login fails?

  }

const LoginTrainee = (props) => {
   if (props.currentState === "trainee") {
        return <Redirect to="/TraineesPage"/>;
    }

    return(

        <div>
            <GoogleLogin
            clientId="476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com"
            render = {renderProps => (
                <Button variant="outline-primary" href="/TraineesPage" size="lg" onClick={renderProps.onClick} disable = {renderProps.disabled} >
                    כניסת מתאמנים</Button>
            )}
            buttonText={''}
            onSuccess={async (response) =>
                {
                    const userDataFromGoogle = extractUserData(response);
                    const userDataFromServer = await serverConnector.checkIfTrainee(userDataFromGoogle.email);
                    if(userDataFromServer.ID !== undefined){ // user found as trainer.
                        console.log("user is trainee:")
                        console.log(userDataFromServer)
                        props.setCurState("trainee");
                        props.setUserData(userDataFromGoogle);
                    } else {
                        console.log("user is not trainee:");

                        // props.setCurState("not a trainer")
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