import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import './index.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import TrainerPage from './components/trainer/TrainerPage'
import TrainingPage from './TrainingPage'
import App from './App';

const routing = (
  <BrowserRouter>
          <Provider store={store}>
            <div>
              <Switch>
                <Route exact path="/" component={App} />
                <Route path="/TrainingPage" component={TrainingPage} />
                <Route path="/TrainerPage" component={TrainerPage} />
              </Switch>
            </div>
          </Provider>
  </BrowserRouter>
)
 
ReactDOM.render(routing, document.getElementById('root'));