import {useLocalStorage} from "../UtillHook";
import Logout from "./Logout";
import React from "react";


const NameAndPic = () => {
    const [userInfo,setUserInfo] = useLocalStorage("userInfo",{});
    const [googlePic,setGooglePic] = useLocalStorage("googlePic",'');

    return <div>
        <img style={{margin: 5,  float: "right"}} width="40px"
             // src={props.authenticationData.imageUrl} alt={}/>
             src={googlePic} alt={''}/>

        <Logout/>
        <h6 dir='rtl'>שלום, {userInfo.first_name + ' ' + userInfo.last_name}</h6>
    </div>;
}
export default NameAndPic;

// NameAndPic.propTypes = {
//     authenticationData: PropTypes.any,
//     alt: PropTypes.string
// };