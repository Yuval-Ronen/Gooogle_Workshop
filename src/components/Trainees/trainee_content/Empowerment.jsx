import react, {useState} from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import AllPersonalProgress from "./AllPersonalProgress";

const Empowerment = () => {

    const [source2, setSource] = useState("https://docs.google.com/document/d/1EmFhltEfkpRu0J7D46anmz_GfE9krBhaWQd35m-HydA/edit");

    console.log(source2);
    return (
    <div className='empowerment'>
                <Container >
                <Row>
                <Col xs={10} >
                    <ShowGoogleDocs source = {source2}/>
                </Col>
                <Col >
                    <AllPersonalProgress onClickCallback={setSource}/>
                </Col>
                </Row>
        </Container>

    </div>
    )

}
export default Empowerment;