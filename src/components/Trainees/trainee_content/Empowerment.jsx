import react, {useState} from "react";
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
                <Container style = {{maxWidth:"100%"}}>
            <Row>
                <Col>
                    <ShowGoogleDocs source = {source2}/>
                </Col>
                <Col lg = "3">
                    <AllPersonalProgress onClickCallback={setSource}/>
                </Col>
            </Row>
        </Container>

    </div>
    )

}
export default Empowerment;