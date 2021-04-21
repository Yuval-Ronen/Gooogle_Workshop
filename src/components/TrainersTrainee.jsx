import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import one from '../trainees_image/1.jpg';

import {Container} from "@material-ui/core";

const TrainersTrainee = (props) => {

    return(
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src= "holder.js/171x180" />
            </Col>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" roundedCircle />
            </Col>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" roundedCircle />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" roundedCircle />
            </Col>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" roundedCircle />
            </Col>
            <Col xs={6} md={4}>
              <Image src="holder.js/171x180" roundedCircle />
            </Col>
          </Row>
        </Container>

            )
}

export default TrainersTrainee