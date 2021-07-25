import {useEffect, useState} from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import React from "react";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";

const Empowerment = () => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [link, setLink] = useState("");
    useEffect( () => {

        serverConnector.getPersonalProgramLink(userInfo.ID).then(res => {
         console.log("link with edit",res);
         let withoutEdit = res.split("/edit");
         console.log("link withoutEdit",withoutEdit[0] +"/preview");

         setLink(withoutEdit[0] + "/preview");
     })
     },[])
    return (
    <div className='empowerment'>
                    <ShowGoogleDocs source = {link}/>



    </div>
    )

}
export default Empowerment;