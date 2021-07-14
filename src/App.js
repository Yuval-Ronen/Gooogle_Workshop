import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import eitan_logo from './eitan_logo.jpg';
import EitanLogo from './EitanLogo.PNG';
import LoginTrainer from "./components/trainer/LoginTrainer";
import LoginTrainee from "./components/Trainees/LoginTrainee";
import photo_eitan from "./photo_eitan.jpg"
import "./App.css"
import StyledButton from "./components/personal_progress/Empowerment"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import { FaFacebook, FaInstagram } from "react-icons/fa";

function App() {
  return (
 
        <div className="transbox">
          <Container fluid>
            <Row style={{ justifyContent: 'center' }}>
              <div className="logo" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100
              }}>
              </div>
              <Image src={EitanLogo} width="240px" style={{ marginTop: 100}}/>
            </Row>
            <Row style={{
              justifyContent: 'center',
              width:"240px"
            }}>
              <FaFacebook/>
              <FaInstagram/>
              <LanguageRoundedIcon/>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              
              <LoginTrainer />
              <LoginTrainee />
            </Row>
          </Container>




        </div>

  
  )
}

export default App;
