import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import TrainerPage from './components/trainer/TrainerPage'
import TraineesPage from './components/Trainees/TraineesPage'
import App from './App';
// import Amplify from "aws-amplify";
// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);

const routing = (
  <BrowserRouter>
          <Provider store={store}>
            <div>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/TraineesPage" component={TraineesPage} />
                <Route path="/TrainerPage" component={TrainerPage} />
              </Switch>
            </div>
          </Provider>
  </BrowserRouter>
)
 
ReactDOM.render(routing, document.getElementById('root'));