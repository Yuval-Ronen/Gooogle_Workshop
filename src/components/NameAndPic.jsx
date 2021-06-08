import {useLocalStorage} from "../UtillHook";
import Logout from "./Logout";
import React from "react";


const NameAndPic = () => {
    const [userInfo,setUserInfo] = useLocalStorage("userInfo",{});
    const [googlePic,setGooglePic] = useLocalStorage("googlePic",'');

    return <p>
        <img style={{margin: 5, display: "inline-block", float: "right"}} width="40px"
             // src={props.authenticationData.imageUrl} alt={}/>
             src={googlePic} alt={''}/>

        <Logout/>
        <h6 dir='rtl'>שלום, {userInfo.first_name + ' ' + userInfo.last_name}</h6>
    </p>;
}
export default NameAndPic;

// NameAndPic.propTypes = {
//     authenticationData: PropTypes.any,
//     alt: PropTypes.string
// };