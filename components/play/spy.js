import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import NanoBar from '../../components/NanoBar';
import spy from '../../public/images/spy.png';

const Spy = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [showBar, setShowBar] = useState(true);

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Custom Functions -----
    const handleTimerEnd = () => {
        setShowBar(false);
        alert('Timer Ended');
    }

    //----- Render -----
    return (
        <div className={classes.spy}>
            <img className={classes.image} src={spy.src} alt='spy' />
            <div className={classes.descriptionbox}>
                <p className={classes.title}>Recognize Fellow Spies!</p>
                <p className={classes.detail}>Spies have a red badge <br/> on their video feed</p>
            </div>
            {showBar && <NanoBar time={10} onEnd={handleTimerEnd}/>}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  spy: {
      width: '100%'
  },
  image: {
      width: '100%',
      height: 'auto',
      borderRadius: 20
  },
  descriptionbox: {
      marginTop: '2vw',
      width: '100%',
      padding: '2vw 0px',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      color: 'white',
      textAlign: 'center'
  },
  title: {
      marginTop: 0,
    fontSize: 24,
    '@media(max-width: 1550px)' : {
        fontSize: 21
    },
    '@media(max-width: 1200px)' : {
        fontSize: 18
    },
    '@media(max-width: 1000px)' : {
        fontSize: 16
    },
  },
  detail: {
      margin: 0,
      fontSize: 18,
    '@media(max-width: 1550px)' : {
        fontSize: 16
    },
    '@media(max-width: 1200px)' : {
      fontSize: 14
    },
    '@media(max-width: 1000px)' : {
      fontSize: 12
    },
  }
}));

export default Spy;