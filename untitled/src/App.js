import './App.css'
import navbar from "./components/navbar"
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

function App() {
  return (
      <>
        <Router>
          <navbar />
          <Switch>
              <Route path = '/' exact />
          </Switch>
        </Router>
      </>
  );
}

export default App;
