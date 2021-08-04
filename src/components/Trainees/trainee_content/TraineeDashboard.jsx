import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import ShowExerciseHistory from "../../show_exercise_history";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrainingCart from "../../my_chart/chart_component";
import TrainTypePie from "../../train_pie/train_type_pie";
import {useLocalStorage} from "../../../UtillHook";
import serverConnector from "../../../server-connector";
import PopUpMedal from "../../Medals/popUpMedal"
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    direction: 'rtl',
});

const TraineeDashboard = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [dataSource, setDataSource] = useState([]);
    const [chartDataSource, setChartDataSource] = useState([]);
    const [trainingHis, setTrainingHis] = useState(["מאמן",[]]);
    const [allMessages, setAllMessages] = useState([]);


    useEffect( () => {
         serverConnector.GetAllTraineeDashboard(userInfo.ID).then(res => {
             console.log("RES",res)
             setTrainingHis(res.trainingHis);
             setDataSource(res.dataSource);
             setChartDataSource(res.chartDataSource);
             setAllMessages(res.allMessages)
             console.log("allMessages", res.allMessages)
         })
     },[userInfo.ID])
    
    const hideNewMassege = () => {
        if (allMessages[0]  === "new") {
            return false;
        }
        else{
            return true;
        }
    };

    return(<StylesProvider jss={jss}>
        <div dir = 'rtl'>
      <ThemeProvider theme={theme}>
             <Container fluid>
            <Row style={{justifyContent: 'flex-start', marginLeft: '0.5%'}}>
                <PopUpMedal allMessages = {allMessages} hideNewMassege = {hideNewMassege()}/>
                </Row>
                <Row sm=  {2} xs={1} >

                    <Col>
                        <TrainingCart dataSource = {chartDataSource} style ={{height:"200px"}}/>
                    </Col>
                    <Col >
                        <TrainTypePie dataSource = {dataSource}/>
                    </Col>
                </Row>
                <Row>
                    <Col >
            <p style = {{textAnchor: "middle",fontSize: "35px", color: "#55215e", textAlign: 'center'}} >אימונים קרובים</p>
                <ShowExerciseHistory training_his ={trainingHis} isDashboard={true}/>
            </Col>
                </Row>
            </Container>

            </ThemeProvider>
      </div>
      </StylesProvider>

    )
}

export default TraineeDashboard;