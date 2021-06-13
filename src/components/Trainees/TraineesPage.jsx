import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { connect } from "react-redux";
import TraineePageContent from "./trainee_content/TraineePageContent";
import PageHeader_Trainee from "./PageHeader_Trainee";


const TraineesPage = (props) => {

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const responseGoogle = (response) => {
        console.log(response);
        setName(response.profileObj.name);
        setUrl(response.profileObj.imageUrl);
    }

    console.log(props.authenticationData);

    // Todo take this to a new file and give it a new name if needed

    return (
        <div className='trainee-page'>
            <Container fluid>
                <Row>
                    <PageHeader_Trainee authenticationData={props.authenticationData} alt={name} />
                </Row>
                <Row>
                    <TraineePageContent />
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

export default connect(mapStateToProps, actionsCreators)(TraineesPage);