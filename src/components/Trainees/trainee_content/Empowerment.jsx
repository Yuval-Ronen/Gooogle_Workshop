import { useEffect, useState } from "react";
import ShowGoogleDocs from "./ShowGoogleDocs";
import React from "react";
import { useLocalStorage } from "../../../UtillHook";
import serverConnector from "../../../server-connector";
import { Tooltip } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import StyledButton from '../../personal_progress/Empowerment.jsx'
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    transitionDuration: '0.4s',
                },
            },
        },
        MuiTooltip: {
            tooltip: {
                direction:'ltr',
            }
        }
    },
});

const Empowerment = () => {
    const [userInfo] = useLocalStorage("userInfo", {});
    const [link, setLink] = useState("");
    const [linkForPdf, setLinkForPdf] = useState("");

    useEffect(() => {

        serverConnector.getPersonalProgramLink(userInfo.ID).then(res => {
            // console.log("link with edit", res);
            let withoutEdit = res.split("/edit");
            // console.log("link withoutEdit", withoutEdit[0] + "/preview");
            setLinkForPdf(withoutEdit[0])
            setLink(withoutEdit[0] + "/preview");
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Paper>
            <div class="MuiToolbar-root MuiToolbar-regular Toolbar-toolbar-528 MuiToolbar-gutters"
                style={{ paddingLeft: "20px", paddingBottom: "20px", paddingTop: "20px", textAlign: 'left' }}>
                <ThemeProvider theme={theme}>
                <Tooltip title="PDF- יצוא ל" >
                    <IconButton onClick={() => { window.open(linkForPdf + "/export?format=pdf", "_self") }}>
                        <SaveIcon fontSize={"medium"} style={{ color: "rgba(0, 0, 0, 0.54)", cursor: "pointer", }} />
                    </IconButton>
                    </Tooltip>
                </ThemeProvider>

                {/* <StyledButton
                        onClick={()=>{window.open(linkForPdf + "/export?format=pdf","_self")}}>
                         PDF- יצוא ל <SaveIcon /></StyledButton> */}
            </div>
            <Divider />
            <div className='empowerment' style={{ paddingTop: "20px" }}>
                <ShowGoogleDocs source={link} />
            </div>
        </Paper>
    )

}
export default Empowerment;