// import react from "react";

const ShowGoogleDocs = ({source}) => {

      if (!source) {
        return <div>Loading...</div>;
      }


    return (
    <div className='empowerment' style={{paddingTop:"20px"}} >
        <iframe
            src={source}
            title="file"
            width="100%"
            height="600px"
            border="bold"
            display = "block"
        ></iframe>
    </div>
    )

}

export default ShowGoogleDocs;