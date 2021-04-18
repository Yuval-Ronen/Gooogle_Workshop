
import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import EitanLogo from './EitanLogo.PNG';

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
         <Button variant="outline-primary" href="/TrainerPage" size="lg" >כניסת מאמנים</Button>{' '}
         </div>
         <div className="buttonTraining" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 10
      }}>
         <Button variant="outline-primary" href="/TrainingPage" size="lg">כניסת מתאמנים</Button>{' '}
         </div>
         </div>
    </div>
  )
}


export default App;