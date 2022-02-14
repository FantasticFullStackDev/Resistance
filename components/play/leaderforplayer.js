import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import avatar from '../../public/images/avatar.jpg';
import group from '../../public/images/group.png';

const LeaderForPlayer = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Custom Functions -----
    

    //----- Render -----
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>Team Leader</div>
            <div className={classes.imgwrapper}>
                <img src={avatar.src} className={classes.avatar} alt='avatar' />
            </div>
            <div className={classes.description}>Team Selection in Progress!</div>
            <div className={classes.imgwrapper}>
                <img src={group.src} className={classes.group} alt='avatar' />
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%'
  },
  title: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '1.6vw',
      lineHeight: '1.8vw'
  },
  imgwrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
  },
  avatar: {
      width: 204,
      height: 204,
      borderRadius: 36,
      border: '4px solid white',
      marginTop: '2.4vw',
  },
  description: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: '1.2vw',
      lineHeight: '1.8vw',
      marginTop: '3.7vw'
  },
  group: {
      width: 260,
      height: 260,
      marginTop: '5vw',
  },
  
}));

export default LeaderForPlayer;