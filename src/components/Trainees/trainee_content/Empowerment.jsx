import {useCallback, useEffect, useRef, useState} from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import React from "react";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {ExportPanel, Grid} from "@devexpress/dx-react-grid-material-ui";
import Fab from "@material-ui/core/Fab";
import {Tooltip} from "@material-ui/core";

const Empowerment = () => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [link, setLink] = useState("");
    const [linkForPdf, setLinkForPdf] = useState("");

    useEffect( () => {

        serverConnector.getPersonalProgramLink(userInfo.ID).then(res => {
         console.log("link with edit",res);
         let withoutEdit = res.split("/edit");
         console.log("link withoutEdit",withoutEdit[0] +"/preview");
         setLinkForPdf(withoutEdit[0])
         setLink(withoutEdit[0] + "/preview");
     })
     },[])

    // const exporterRef = useRef(null);
    //   const startExport = useCallback((options) => {
    //     exporterRef.current.exportGrid(options);
    //   }, [exporterRef]);

    return (

        <div>
            <div class="MuiToolbar-root MuiToolbar-regular Toolbar-toolbar-528 MuiToolbar-gutters"
                 style={{paddingLeft:"20px", paddingRight: "30px", paddingTop: "20px"}}>
                <Tooltip title="PDF- יצוא ל" >
                    <PictureAsPdfIcon fontSize={"medium"} onClick={()=>{window.open(linkForPdf + "/export?format=pdf","_self")}}
                    style={{size: "40px", color: "grey"}}>
                    </PictureAsPdfIcon>
                </Tooltip>
            </div>


             <div className='empowerment' style={{paddingTop: "20px"}}>
                            <ShowGoogleDocs source = {link} />
            </div>
        </div>
    )

}
export default Empowerment;