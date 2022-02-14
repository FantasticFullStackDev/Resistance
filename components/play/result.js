import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import { _setGameState } from '../../reducer/gamestateSlice';
import win from '../../public/images/win.png';
import lose from '../../public/images/loss.png';

const Result = (props) => {
    //----- others ------
    const classes = useStyles();
    const router = useRouter();
    

    //----- Global State -----
    // const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [role, setRole] = useState('resistance');

    //----- Lifecycle Events -----
    useEffect(() => {
        // Set Game State
        dispatch(_setGameState('won'));
    }, [])

    //----- Custom Functions -----
    const playAgain = () => {
        alert('play Again');
    }

    const backToHome = () => {
        router.push('/');
    }

    //----- Render -----
    return (
        <React.Fragment>
        <div className={classes.wrapper}> 
            <img src={role === 'resistance'?win.src:lose.src} alt='result' />
        </div>
            <button className={classes.button} style={{backgroundColor: 'white'}} onClick={playAgain}>Play Again</button> 
            <button className={classes.button} onClick={backToHome}>Back to Home</button> 
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      '& img': {
          width: '90%',
          height: 'auto',
          marginTop: '7vw',
          marginBottom: '10vw'
      }
  },
  button: {
      width: '100%',
      height: 56,
      backgroundColor: 'yellow',
      borderRadius: 6,
      borderWidth: 0,
      color: 'black',
      fontSize: 18,
      fontWeight: 700,
      marginBottom: '1.2vw',
      '@media(max-width: 1500px)' : {
        height: 50,
        fontSize: 16,
      },
      '@media(max-width: 1200px)' : {
        fontSize: 40,
        fontSize: 14,
      },
      '&:hover': {
          opacity: 0.8
      }
  }
}));

export default Result;