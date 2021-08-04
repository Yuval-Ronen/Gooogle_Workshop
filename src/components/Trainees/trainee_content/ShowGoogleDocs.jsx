// import react from "react";
import Paper from '@material-ui/core/Paper';

const ShowGoogleDocs = ({source}) => {

      if (!source) {
        return <div>Loading...</div>;
      }


    return (
      <Paper>

     
    <div className='empowerment' style={{paddingTop:"20px"}} >
        <iframe
            src={source}
            title="file"
            width="100%"
            height="600px"
            border="bold"
            display = "block"
            sandbox = "allow-top-navigation"
        ></iframe>
    </div>
    </Paper>
    )

}

export default ShowGoogleDocs;