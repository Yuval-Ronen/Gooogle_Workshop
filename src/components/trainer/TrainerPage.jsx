
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {connect} from "react-redux";
import TrainerPageContent from "./TrainerPageContent";
import PageHeader from "./PageHeader";


const TrainerPage = (props) => {

    // const [name, setName] = useState("");
    // const [url, setUrl] = useState("");
    // const responseGoogle = (response) => {
    // console.log(response);
    // setName(response.profileObj.name);
    // setUrl(response.profileObj.imageUrl);
    // }

    return(
        <div className='trainer-page'> 
            <Container fluid>
            <Row>
                <PageHeader/>
            </Row>
            <Row>
                    <TrainerPageContent/>
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

export default connect(mapStateToProps,actionsCreators)(TrainerPage);