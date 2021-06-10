import {useLocalStorage} from "../UtillHook";
import Logout from "./Logout";
import React from "react";


const NameAndPic = () => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [googlePic] = useLocalStorage("googlePic",'');

    return <div>
        <img style={{margin: 5, display: "inline-block", float: "right"}} width="40px"
             // src={props.authenticationData.imageUrl} alt={}/>
             src={googlePic} alt={''}/>

        <Logout/>
        <h6 dir='rtl'>שלום, {userInfo.first_name + ' ' + userInfo.last_name}</h6>
    </div>;
}
export default NameAndPic;
