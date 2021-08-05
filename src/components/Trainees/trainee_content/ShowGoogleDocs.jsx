// import react from "react";
import './ShowGoogle.css'
import sheets from "../../../icons/google-sheets.png"
import React from "react";

const ShowGoogleDocs = (props) => {

      if (!props.source) {
        return <div>Loading...</div>;
      }


    return(
        <div>
            <iframe className={"mobile-hide"}
                src={props.source}
                title="file"
                width="100%"
                height="600px"
            ></iframe>
            <div className={"mobile-show"} style={{height: "100%", position: "relative", border: "none", padding: "40px", }}>
                <a href = {props.source_for_mobile}>
                    <img  src={sheets} alt="" style={{ width: "100px", height: "100px", position:"absolute"}} />
                </a>
            </div>
        </div>
    )

}

export default ShowGoogleDocs;