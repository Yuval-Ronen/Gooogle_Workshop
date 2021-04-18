

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import TrainerPage from './TrainerPage'
import TrainingPage from './TrainingPage'
import App from './App';


const routing = (
  <BrowserRouter>
    <div>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/TrainingPage" component={TrainingPage} />
        <Route path="/TrainerPage" component={TrainerPage} />
      </Switch>
    </div>
  </BrowserRouter>
)
 
ReactDOM.render(routing, document.getElementById('root'));