import React from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';


const TraineeResult = ({ listOfTrainees }) => {

    const useStyles = makeStyles((theme) => ({
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
            flexWrap: 'wrap',
            justifyContent: 'center',

        },
        item: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(0.3),
            },
            flexDirection: 'column',
            alignItems: 'center ',
            color: '#55215e',
            transition: 'all 0.6s',
            '&:hover': {
                color: '#f50057',
                textDecoration: 'none',
                opacity: 0.5,
            },
        },
    }));

    const classes = useStyles();


    return <div>

        <div className={classes.root}>
            {listOfTrainees?.length > 0 && listOfTrainees.map((trainee) =>
                <a className={classes.item} href={`/TrainerPage/trainee?trainee_id=${trainee.trainee_id}`} >

                    <Avatar alt='image' src={trainee.image} className={classes.large} />
                    {/* <Chip
                    label=  {trainee.first_name + ' ' + trainee.last_name}
                    color= 'secondary'
                    style={{
                        cursor: 'pointer',
                        fontFamily: 'Segoe UI',
                    }}>
                   
                    </Chip> */}
                    <h6 >{trainee.first_name}</h6>
                    <h6 >{trainee.last_name}</h6>

                </a>
            )
            }
        </div>
    </div>
}
export default TraineeResult;