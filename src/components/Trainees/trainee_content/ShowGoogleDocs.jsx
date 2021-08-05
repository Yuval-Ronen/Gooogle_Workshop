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
            <div className={"mobile-show mobile-dont-show"} style={{height: "100%", position: "relative", border: "none", padding: "40px", }}>
                <a href = {props.source_for_mobile} style={{textAlign:'center', cursor:'pointer'}}>
                    <p style={{direction:'rtl', color: "#f50057"}}>היכנס דרך Google Sheets</p>
                    <img  src={sheets} alt="" style={{ width: "100px", height: "100px", marginLeft:'30%', marginRight:'30%'}} />
                </a>
            </div>
        </div>
    )

}

export default ShowGoogleDocs;