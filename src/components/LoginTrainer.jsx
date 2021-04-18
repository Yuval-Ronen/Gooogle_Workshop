import React, {useState} from 'react'
import GoogleLogin from "react-google-login";
import { Link, Redirect } from 'react-router-dom';
import {Button} from "react-bootstrap";

// const [name, setName] = useState("");
// const [url, setUrl] = useState("");

const responseGoogle = (response) => {
    console.log(response);
    // setName(response.profileObj.name);
    // setUrl(response.profileObj.imageUrl);
  }
class LoginTrainer extends React.Component{

    state = {
      isAuthenticated: false,
    }


    constructor(props) {
        super(props);
        console.log(props)
    }

    // componentDidMount(){
    //   window.gapi.signin2.render('g-signin2', {
    //     'scope': 'https://www.googleapis.com/auth/plus.login',
    //     'width': 200,
    //     'height': 50,
    //     'longtitle': true,
    //     'theme': 'dark',
    //     'onsuccess': () => this.setState({
    //         isAuthenticated: true,
    //     })
    //   })
    // }

    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    }

    render() {
        if (this.state.isAuthenticated) {
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
            onSuccess={() => this.setState({isAuthenticated: true,})}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>)
    }
}


export default LoginTrainer