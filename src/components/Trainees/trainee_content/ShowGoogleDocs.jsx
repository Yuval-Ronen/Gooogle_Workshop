// import react from "react";

const ShowGoogleDocs = ({source}) => {

      if (!source) {
        return <div>Loading...</div>;
      }


    return (
    <div className='empowerment' >
        <iframe
            src={source}
            title="file"
            width="100%"
            height="600px"
            border="bold"
        ></iframe>
    </div>
    )

}

export default ShowGoogleDocs;