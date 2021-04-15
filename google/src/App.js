
import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import TrainerPage from "./components/TrainerPage";

import {createElement} from "react";
import GoogleLogin from 'react-google-login';
import {HashRouter as Router, Switch, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path='/login'>
                <Login/>
            </Route>
            <Route path='/trainerPage'>
                <TrainerPage/>
            </Route>
            <Route exact path='/'>
                <div>
                  HOME PAGE!
                </div>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}


export default App;