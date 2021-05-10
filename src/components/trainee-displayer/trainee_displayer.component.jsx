import React from 'react';
import style from './trainee_displayer.module.css';
import StarRateIcon from '@material-ui/icons/StarRate';
import Image from 'react-bootstrap/Image'
import TraineeProgress from "../trainee_page_and_progress/trainee_pageProgress.component"

const TraineeDisplay = ({trainee}) => {


    return <div className={style.container} >
        {/*<TraineeProgress trainee = {trainee}/>*/}
        <div className={style.title}>
            {trainee.first_name + ' ' + trainee.last_name}
        </div>
        <div className={style.img} >
            <img src={trainee.image} alt="no-pic" class = "rounded-circle" />
        </div>

    </div>
}

export default TraineeDisplay;