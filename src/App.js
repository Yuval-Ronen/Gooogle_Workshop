import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import EitanLogo from './icons/EitanLogo.png';
import LoginTrainer from "./components/trainer/LoginTrainer";
import LoginTrainee from "./components/Trainees/LoginTrainee";
import "./App.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FaFacebook, FaInstagram, FaGlobe } from "react-icons/fa";
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        backgroundColor: 'white',
        fontSize: '1.6rem',
        color: '#88648f',
        '&:hover': {
          color: 'white',
          backgroundColor: 'rgb(85, 33, 94)',
          transitionDuration: '0.4s',
        },
      },
    },
  },
});

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
          <Image src={EitanLogo} width="240px" style={{ marginTop: 100 }} />
        </Row>
        <Row style={{
          justifyContent: 'center',
          margin: 15,
        }}>
          <ThemeProvider theme={theme}>
          <Container fluid style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
          }}>
            <IconButton aria-label="FaceBook" href="https://www.facebook.com/EitanEverybodyCan/" target="_blank">
              <FaFacebook />
            </IconButton>
            <IconButton  aria-label="Instagram" href="https://www.instagram.com/eitan_everybodycan/" target="_blank" style={{marginRight:'5px', marginLeft:'5px'}}>
            <FaInstagram />
            </IconButton>
            <IconButton aria-label="Eitan website" href="https://www.everybodycan.co.il/" target="_blank">
            <FaGlobe />
            </IconButton> 
          </Container>
          </ThemeProvider>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
        <LoginTrainee />
          <LoginTrainer />
          
        </Row>
      </Container>




    </div>


  )
}

export default App;
