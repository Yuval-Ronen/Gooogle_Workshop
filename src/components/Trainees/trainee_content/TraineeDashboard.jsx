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


const TraineeDashboard = (props) => {
    const [userInfo] = useLocalStorage("userInfo",{});
    const [dataSource, setDataSource] = useState([]);
    const [chartDataSource, setChartDataSource] = useState([{'month': 'ינואר', 'training_amount': 0}, {'month': 'ינואר', 'training_amount': 0}, {'month': 'ינואר', 'training_amount': 0}, {'month': 'ינואר', 'training_amount': 0}, {'month': 'ינואר', 'training_amount': 0}, {'month': 'ינואר', 'training_amount': 0}, {'month': 'פבואר', 'training_amount': 1}, {'month': 'פבואר', 'training_amount': 0}, {'month': 'פבואר', 'training_amount': 0}, {'month': 'פבואר', 'training_amount': 0}, {'month': 'פבואר', 'training_amount': 0}, {'month': 'פבואר', 'training_amount': 0}, {'month': 'מרץ', 'training_amount': 0}, {'month': 'מרץ', 'training_amount': 1}, {'month': 'מרץ', 'training_amount': 0}, {'month': 'מרץ', 'training_amount': 0}, {'month': 'מרץ', 'training_amount': 0}, {'month': 'מרץ', 'training_amount': 0}, {'month': 'אפריל', 'training_amount': 0}, {'month': 'אפריל', 'training_amount': 0}, {'month': 'אפריל', 'training_amount': 1}, {'month': 'אפריל', 'training_amount': 0}, {'month': 'אפריל', 'training_amount': 0}, {'month': 'אפריל', 'training_amount': 0}, {'month': 'מאי', 'training_amount': 0}, {'month': 'מאי', 'training_amount': 0}, {'month': 'מאי', 'training_amount': 0}, {'month': 'מאי', 'training_amount': 1}, {'month': 'מאי', 'training_amount': 0}, {'month': 'מאי', 'training_amount': 0}, {'month': 'יוני', 'training_amount': 0}, {'month': 'יוני', 'training_amount': 0}, {'month': 'יוני', 'training_amount': 0}, {'month': 'יוני', 'training_amount': 0}, {'month': 'יוני', 'training_amount': 3}, {'month': 'יוני', 'training_amount': 0}, {'month': 'יולי', 'training_amount': 0}, {'month': 'יולי', 'training_amount': 0}, {'month': 'יולי', 'training_amount': 0}, {'month': 'יולי', 'training_amount': 0}, {'month': 'יולי', 'training_amount': 0}, {'month': 'יולי', 'training_amount': 1}, {'month': 'אוגוסט', 'training_amount': 0}, {'month': 'אוגוסט', 'training_amount': 0}, {'month': 'אוגוסט', 'training_amount': 0}, {'month': 'אוגוסט', 'training_amount': 0}, {'month': 'אוגוסט', 'training_amount': 0}, {'month': 'אוגוסט', 'training_amount': 0}, {'month': 'ספטמבר', 'training_amount': 0}, {'month': 'ספטמבר', 'training_amount': 0}, {'month': 'ספטמבר', 'training_amount': 0}, {'month': 'ספטמבר', 'training_amount': 0}, {'month': 'ספטמבר', 'training_amount': 0}, {'month': 'ספטמבר', 'training_amount': 0}, {'month': 'אוקטובר', 'training_amount': 0}, {'month': 'אוקטובר', 'training_amount': 0}, {'month': 'אוקטובר', 'training_amount': 0}, {'month': 'אוקטובר', 'training_amount': 0}, {'month': 'אוקטובר', 'training_amount': 0}, {'month': 'אוקטובר', 'training_amount': 0}, {'month': 'נובמבר', 'training_amount': 0}, {'month': 'נובמבר', 'training_amount': 0}, {'month': 'נובמבר', 'training_amount': 0}, {'month': 'נובמבר', 'training_amount': 0}, {'month': 'נובמבר', 'training_amount': 0}, {'month': 'נובמבר', 'training_amount': 0}, {'month': 'דצמבר', 'training_amount': 0}, {'month': 'דצמבר', 'training_amount': 0}, {'month': 'דצמבר', 'training_amount': 0}, {'month': 'דצמבר', 'training_amount': 0}, {'month': 'דצמבר', 'training_amount': 0}, {'month': 'דצמבר', 'training_amount': 0}]);
    const [trainingHis, setTrainingHis] = useState(["מאמן",[]]);
    useEffect( () => {
         serverConnector.getUpcomingExercise_trainee(userInfo.ID).then(res => {
             setTrainingHis(res);
             console.log("trainingHis", trainingHis)
         })
     },[])
       useEffect( () =>{
         let helper = [];
         serverConnector.getTypeAmount(userInfo.ID).then(res => {
             setDataSource(res)
         })

    },[])

    // useEffect( () =>{
    //       serverConnector.getTrainingAmountByMonth_trainee(userInfo.ID).then(res => {
    //           setChartDataSource(res);
    //       })
    // },[])

    return(
            <Container fluid>
                <Row xs=  'auto'>
                     <Col >
                        <TrainTypePie dataSource = {dataSource}/>
                    </Col>
                    <Col>
                        <TrainingCart dataSource = {chartDataSource} style ={{height:"200px"}}/>
                    </Col>

                </Row>
                <Row>
                    <Col>
            <p style = {{textAnchor: "middle",fontSize: "35px", color: "#55215e", textAlign: 'center'}} >אימונים קרובים</p>
                <ShowExerciseHistory training_his ={trainingHis} isDashboard={true}/>
            </Col>
                </Row>
            </Container>

            

    )
}

export default TraineeDashboard;