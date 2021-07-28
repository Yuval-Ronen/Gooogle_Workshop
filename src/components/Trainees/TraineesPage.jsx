import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {connect} from "react-redux";
import TraineePageContent from "./trainee_content/TraineePageContent";
import PageHeaderTrainee from "./PageHeader_Trainee";


const TraineesPage = (props) => {
    return(
        <div className='trainee-page'>
            
            <Container fluid>

            <Row>
                <PageHeaderTrainee />
            </Row>
            <Row>
                    <TraineePageContent/>
            </Row>
            </Container>
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

export default connect(mapStateToProps,actionsCreators)(TraineesPage);