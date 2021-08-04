// import react from "react";
import Paper from '@material-ui/core/Paper';

const ShowGoogleDocs = ({source}) => {

      if (!source) {
        return <div>Loading...</div>;
      }


    return (
  

     
    
        <iframe
            src={source}
            title="file"
            width="100%"
            height="400px"

        ></iframe>
  
    )

}

export default ShowGoogleDocs;