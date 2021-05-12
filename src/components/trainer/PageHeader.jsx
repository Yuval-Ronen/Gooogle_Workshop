import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import EitanLogoSmall from "../../EitanLogoSmall.PNG";
import * as PropTypes from "prop-types";
import React from "react";

const PageHeader = (props) =>
    <>
        <Col sm={9}>
            <Image src={EitanLogoSmall}/>
        </Col>
        <Col sm={3}>
            <div className="App">
                <img style={{margin: 10}} width="50px" src={props.authenticationData.imageUrl} alt={props.alt}/>
                <h5 dir='rtl'>שלום, {props.authenticationData.name}</h5>
            </div>
        </Col>
    </>

PageHeader.propTypes = {
    authenticationData: PropTypes.any,
    alt: PropTypes.string
};
export default PageHeader;