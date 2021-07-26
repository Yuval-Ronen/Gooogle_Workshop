import {useCallback, useEffect, useRef, useState} from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import React from "react";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {ExportPanel, Grid} from "@devexpress/dx-react-grid-material-ui";

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
            {/*<ExportPanel startExport={startExport} />*/}

            {/*<PictureAsPdfIcon onClick={window.open(linkForPdf + "/export?format=pdf")}>*/}
            {/*</PictureAsPdfIcon>*/}
            <div className='empowerment'>
                            <ShowGoogleDocs source = {link}/>
            </div>
        </div>
    )

}
export default Empowerment;