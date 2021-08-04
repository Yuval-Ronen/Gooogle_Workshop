// import react from "react";
import Paper from '@material-ui/core/Paper';

const ShowGoogleDocs = ({source}) => {

      if (!source) {
        return <div>Loading...</div>;
      }


    return (
  
<div>
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSlvOXwEBHTlmxrXF0mzWFcCAGZd5Zm22nkvXtZSisJf12ccI5XFMXFwQqHGqxeo5rZLkpm1j8qwpzk"></iframe>

     
    
        <iframe
            src={source}
            title="file"
            width="100%"
            height="400px"

        ></iframe>
  </div>
    )

}

export default ShowGoogleDocs;