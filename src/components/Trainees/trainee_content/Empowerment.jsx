import {useEffect, useState} from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import AllPersonalProgress from "./AllPersonalProgress";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";

const Empowerment = () => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [link, setLink] = useState("");
    useEffect( () => {

        serverConnector.getPersonalProgramLink(userInfo.ID).then(res => {
         console.log("link",res);
         let withoutEdit = res.split("/edit")
         setLink(withoutEdit[0]);
     })
     },[])
    return (
    <div className='empowerment'>
                    <ShowGoogleDocs source = {link}/>



    </div>
    )

}
export default Empowerment;