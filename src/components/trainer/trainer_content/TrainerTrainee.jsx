import React, { useEffect, useState } from "react";
import TrainingCart from "../../my_chart/chart_component";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PersonalProgress from "../../personal_progress/personalProgress_component";
import ShowExerciseHistory from "../../show_exercise_history";
import serverConnector from "../../../server-connector";
import { useLocation } from "react-router-dom"
import Medals from "../../Medals/medals_TrainerTrainee"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MuiTheme = createMuiTheme({
    direction: 'rtl',
});

const TrainerTrainee = () => {
    let location = useLocation()
    let params = new URLSearchParams(location.search);
    let trainee_id = parseInt(params.get("trainee_id")); // is the number 123
    // console.log("trainee_id", trainee_id)
    const [trainingHis, setTrainingHis] = useState(["מתאמנים", []]);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        serverConnector.getAllForTraineePageInTrainer(trainee_id).then(res => {
            setTrainingHis(res.trainingHis);
            setDataSource(res.dataSource);
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    return (
        <StylesProvider jss={jss}>
        <div dir='ltr'>
            <ThemeProvider theme={MuiTheme}>
            {/*    <h1> need to put name</h1>*/}
            <Container fluid style={{justifyContent:'center'}}>
                <Row >
                    <Col  fluid style={{textAlign:'center'}}>
                        <p>
                            <PersonalProgress trainee={trainee_id} />
                        </p>
                        <p>
                            <Medals trainee={trainee_id}/>
                        </p>
                    </Col>
                    <Col  sm={9} xs={20} >
                        <TrainingCart dataSource = {dataSource}/>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <p style={{ textAnchor: "middle", fontSize: "35px", color: "#55215e", textAlign: 'center', marginBottom: '15px'  }} >היסטוריית אימונים</p>
                        <ShowExerciseHistory training_his={trainingHis} isDashboard={false} />

                    </Col>
                </Row>
            </Container>
            </ThemeProvider>
                </div>
            </StylesProvider>


    )
}

export default TrainerTrainee;