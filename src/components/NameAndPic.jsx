import {useLocalStorage} from "../UtillHook";
import Logout from "./Logout";
import React from "react";


const NameAndPic = () => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [googlePic] = useLocalStorage("googlePic",'');

    return <div>
        <div className={"pic and logout"} style={{display:"block"}}>
            <img style={{margin: 5, display: "inline", float: "right"}} width="40px"
                 // src={props.authenticationData.imageUrl} alt={}/>
                 src={googlePic} alt={''}/>

            <Logout/></div>
        <h6 style={{display: "inline-block", float: "right"}} dir='rtl'>שלום, {userInfo.first_name + ' ' + userInfo.last_name}</h6>
    </div>;
}
export default NameAndPic;
