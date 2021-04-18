import React from 'react'
import GoogleLogin from "react-google-login";
import { Link, Redirect } from 'react-router-dom';



class Login extends React.Component{

    state = {
      isAuthenticated: false,
    }

    constructor(props) {
        super(props);
        console.log(props)
    }

    componentDidMount(){
      window.gapi.signin2.render('g-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': () => this.setState({
            isAuthenticated: true,
        })
      })
    }

    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    }

    render() {
        if (this.state.isAuthenticated) {
            return <Redirect to="/trainerPage"/>;
        }
        return(
        <div>
            <div id="g-signin2" />
        </div>)
    }
}


export default Login