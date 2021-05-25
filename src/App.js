import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import EitanLogo from './EitanLogo.PNG';
import GoogleLogin from "react-google-login";
import LoginTrainer from "./components/trainer/LoginTrainer";
import LoginTrainee from "./components/Trainees/LoginTrainee";

const responseGoogle = (response) => {
    console.log(response);

  }
function App() {
  return(
    <div className="App">

      <div className="logo" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 30,
          marginTop: 100
      }}>
        <Image src={EitanLogo} width="240px"   />
      </div>

      <div className="buttons" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
      }}>
         <div className="buttonTrainer" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 10
      }}>
         <LoginTrainer/>

         </div>
         <div className="buttonTraining" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 10
      }}>
         <LoginTrainee/>
         </div>
         </div>
    </div>
  )
}


export default App;