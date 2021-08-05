// import react from "react";

const ShowGoogleDocs = ({source}) => {

      if (!source) {
        return <div>Loading...</div>;
      }


    return(
        <iframe
            src={source}
            title="file"
            width="100%"
            height="600px"

        ></iframe>
    )

}

export default ShowGoogleDocs;