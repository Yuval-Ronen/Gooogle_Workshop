import {useState} from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import AllPersonalProgress from "./AllPersonalProgress";

const Empowerment = () => {

    const [source2, setSource] = useState("https://docs.google.com/spreadsheets/d/1BUT4aA00zEG0SiwX7xE6fNW67LuQCsHBvlx8RGQczZI/#gid=470620253");

    console.log(source2);
    return (
    <div className='empowerment'>
                <Container fluid>
                <Row xs={1}>
                <Col  lg={10} >
                    <ShowGoogleDocs source = {source2}/>
                </Col>
                <Col lg={2} xs={{ order: 'first' }} lg={{ order: 'last' }}>
                    <AllPersonalProgress onClickCallback={setSource}/>
                </Col>
                </Row>
        </Container>

    </div>
    )

}
export default Empowerment;