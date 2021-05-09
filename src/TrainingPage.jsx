import ReactDOM from 'react-dom';
import empowerment from './empowerment'
import history from './history'
import photos from './photos'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { BsClockHistory } from "react-icons/bs";
import { BsCalendar } from "react-icons/bs";
import { BsCamera } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import EitanLogoSmall from './EitanLogoSmall.PNG';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {connect} from "react-redux";
import Logout from "./components/Logout";
import Calendar from "./Calendar";


const TrainingPage = (props) => {

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setUrl(response.profileObj.imageUrl);
  }
    return(
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row>
    <Col sm={9}>
             <Image src={EitanLogoSmall} />
        </Col>
        <Col sm={3}>
            <div className="App">
            <img  style={{margin: 10}} width="50px" src={props.authenticationData.imageURL} alt={name}/>
            <h5 dir='rtl'>שלום, {props.authenticationData.name}</h5>
            </div>
        </Col>
        
  </Row>
     <Row>
        <Col sm={9}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    <h1>לוח אימונים</h1>
                <Calendar />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                <h1>מערך העצמה</h1>
                <empowerment />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                <h1>תמונות מאימונים</h1>
                <photos />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                <h1>היסטוריית אימונים</h1>
                <history />
                </Tab.Pane>
            </Tab.Content>
            </Col>
            <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                <Nav.Item>
                <Nav.Link eventKey="first">לוח אימונים  <BsCalendar /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="second" >מערך העצמה  <BsGraphUp /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="third">תמונות מאימונים  <BsCamera /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="fourth">היסטוריית אימונים  <BsClockHistory /></Nav.Link>
                </Nav.Item>
                    <Logout/>
                 </Nav>
            </Col>
            
        </Row>
        </Tab.Container>
            )
}

const actionsCreators = {

}

//what in state will be available to props
const mapStateToProps = (state) => ({
    authenticationData: state.authenticationData,
});

export default connect(mapStateToProps,actionsCreators)(TrainingPage);
