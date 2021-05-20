import {BsCalendar, BsCamera, BsClockHistory, BsGraphUp} from "react-icons/bs";
import Nav from "react-bootstrap/Nav";
import Logout from "../Logout";
import React from "react";
import AddTraining from '../AddTraining_Components/AddTraining.js'

const TrainerContentController = () =>
    <div className='trainer-content-controller'>
        <div>
        <AddTraining />
        </div>
        <Nav variant="pills" className="flex-column">
            <Nav.Item>
                <Nav.Link href="/TrainerPage/exercise_schedule">לוח אימונים <BsCalendar/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/TrainerPage/trainees">מתאמנים <BsGraphUp/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/TrainerPage/exercise_pictures">תמונות מאימונים <BsCamera/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/TrainerPage/exercise_history">היסטוריית אימונים <BsClockHistory/></Nav.Link>
            </Nav.Item>
            <Logout/>
        </Nav>
    </div>

export default TrainerContentController;