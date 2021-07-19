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
     },[])
    
    const hideNewMassege = () => {
        if (allMessages[0]  == "new") {
            return false;
        }
        else{
            return true;
        }
    };

    return(<div>
             <Container fluid>
            <Row style={{justifyContent: 'flex-end', marginRight: '0.5%'}}>
                <PopUpMedal allMessages = {allMessages} hideNewMassege = {hideNewMassege()}/>
                </Row>
                <Row sm=  {2} xs={1} >
                     <Col >
                        <TrainTypePie dataSource = {dataSource}/>
                    </Col>
                    <Col>
                        <TrainingCart dataSource = {chartDataSource} style ={{height:"200px"}}/>
                    </Col>

                </Row>
                <Row>
                    <Col >
            <p style = {{textAnchor: "middle",fontSize: "35px", color: "#55215e", textAlign: 'center'}} >אימונים קרובים</p>
                <ShowExerciseHistory training_his ={trainingHis} isDashboard={true}/>
            </Col>
                </Row>
            </Container>

            </div>

    )
}

export default TraineeDashboard;