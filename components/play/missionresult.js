import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import achieve from '../../public/images/achieve.png';
import failed from '../../public/images/failed.png';

const MissionResult = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Global State -----
    // const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [results, setResults] = useState([
        {
            num: 0,
            tapped: false,
            pass: true
        },
        {
            num: 1,
            tapped: false,
            pass: true
        },
        {
            num: 2,
            tapped: false,
            pass: false
        },
        {
            num: 3,
            tapped: false,
            pass: false
        },
    ])

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Custom Functions -----
    

    //----- Render -----
    return (
        <div className={classes.wrapper}> 
            <div className={classes.title}> Results </div>
            <div className={classes.resultBox}>
                <div>
                    <img src={results[0]?.pass?achieve.src:failed.src} alt='rslt' />
                </div>
                <p> 1st Mission </p>
            </div>
            <div className={classes.resultBox}>
                <div>
                    <img src={results[1]?.pass?achieve.src:failed.src} alt='rslt' />
                </div>
                <p> 2nd Mission </p>
            </div>
            <div className={classes.resultBox}>
                <div>
                    <img src={results[2]?.pass?achieve.src:failed.src} alt='rslt' />
                </div>
                <p> 3rd Mission </p>
            </div>
            <div className={classes.resultBox}>
                <div>
                    <img src={results[3]?.pass?achieve.src:failed.src} alt='rslt' />
                </div>
                <p> 4th Mission </p>
            </div>
            <div className={classes.resultBox}>
                <div>
                    <img src={results[4]?.pass?achieve.src:failed.src} style={{opacity: results[4]?1:0}} alt='rslt' />
                </div>
                <p> 5th Mission </p>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
  },
  title: {
      width: '100%', 
      marginTop: '2vw', 
      color: 'white', 
      fontWeight: 600,
      fontSize: '1.5vw',
      lineHeight: '40px',
      textAlign: 'center',
      marginBottom: '3vw',
      '@media(max-width: 1550px)' : {
        fontSize: 25
      },
      '@media(max-width: 1200px)' : {
        fontSize: 22
      },
  },
  resultBox: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '1.6vw',
      '& div': {
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.4)',
            '@media(max-width: 1550px)' : {
                width: 70,
                height: 70
            },
            '@media(max-width: 1400px)' : {
                width: 60,
                height: 60
            },
            '@media(max-width: 1200px)' : {
                width: 50,
                height: 50
            },
            '& img': {
                width: '100%',
                heigth: 'auto',
                borderRadius: '50%'
            }
      },
      '& p': {
            margin: 0,
            marginTop: '0.3vw',
            color: 'white',
            fontSize: 16,
            '@media(max-width: 1550px)' : {
                fontSize: 14
            },
            '@media(max-width: 1400px)' : {
                fontSize: 12,
            },
            '@media(max-width: 1200px)' : {
                fontSize: 12,
            },
      }
  },
}));

export default MissionResult;