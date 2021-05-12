
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {connect} from "react-redux";
import TrainerPageContent from "./TrainerPageContent";
import TrainerContentController from "./TrainerContentController";
import PageHeader from "./PageHeader";



const TrainerPage = (props) => {

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setUrl(response.profileObj.imageUrl);
    }

    console.log(props.authenticationData);

    // Todo take this to a new file and give it a new name if needed

    return(
        <div className='trainer-page'>
            <Row>
                <PageHeader authenticationData={props.authenticationData} alt={name}/>
            </Row>
            <Row>
                <Col sm={9}>
                    <TrainerPageContent/>
                </Col>
                <Col sm={3}>
                    <TrainerContentController/>
                </Col>
            </Row>
        </div>
    )
}
//actions on the storage
const actionsCreators = {

}

//what in state will be available to props
const mapStateToProps = (state) => ({
    authenticationData: state.authenticationData,
});

export default connect(mapStateToProps,actionsCreators)(TrainerPage);