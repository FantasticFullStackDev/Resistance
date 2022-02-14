import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import mission from '../../public/images/mission.png';

const Mission = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Global State -----
    // const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [missingMembers, setMissingMembers] = useState([
        { name: 'Mike' },
        { name: 'Anna' },
        { name: 'Jimmy' },
        { name: 'Duma' },
        { name: 'Nina' },
    ]);
    const [value, setValue] = useState(false);

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Custom Functions -----
    const setAsFail = () => {
        alert('set as Fail');
        setValue('fail');
    }

    const setAsSuccess = () => {
        alert('set as Success');
        setValue('success');
    }

    //----- Render -----
    return (
        <div className={classes.wrapper}> 
            <div className={classes.title}> {value ? 'Mission In Progress' : 'Mission'} </div>
            <div className={classes.body}>
                <img src={mission.src} alt='mission' style={{width: '100%', height: 'auto', borderRadius: 20, marginTop: '1.25vw'}}/>
            </div>
            <div className={classes.paused} style={{display: value ? 'flex' : 'none'}}>
                <div className={classes.waiting}> Waiting for... </div>
                <div style={{width: '100%', marginTop: '1.6vw'}}>
                    {
                        missingMembers.map((item) => {
                            return (
                                <div className={classes.item} key={item.name}> {item.name} </div>
                            )
                        })
                    }
                </div>
            </div>             
            <div className={classes.buttonContainer} style={{display: value?'none':'flex'}}>
                <button className={classes.button} style={{backgroundColor: '#E22F2F'}} onClick={setAsFail}> Fail </button>
                <button className={classes.button} style={{backgroundColor: '#07A603'}} onClick={setAsSuccess}> Success </button>
            </div>         
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
  },
  paused: {
      padding: '2vw 1.3vw',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '2.5vw',
      display: 'flex',      
      flexDirection: 'column'
  },
  title: {
      width: '100%', 
      marginTop: '2vw', 
      color: 'white', 
      fontWeight: 600,
      fontSize: '1.5vw',
      lineHeight: '40px',
      textAlign: 'center',
      '@media(max-width: 1550px)' : {
        fontSize: 25
      },
      '@media(max-width: 1200px)' : {
        fontSize: 22
      },
  },
  waiting: {
      padding: '6px 20px',
      background: '#4E3EC8',
      borderRadius: 33,
      fontSize: 18,
      lineHeight: '25px',
      fontWeight: 'bold',
      color: 'white',
      width: 'fit-content',
  },
  item: {
      padding: '0.35vw 1.1vw',
      borderRadius: '5px',
      background: 'white',
      float: 'left',
      marginBottom: 10,
      marginLeft: 10,
      color: 'black',
      fontSize: 16,
      lineHeight: '22px'
  },
   buttonContainer: {
      width: '100%',
      display: 'flex',      
      justifyContent: 'space-between'
  },
  button: {
      width: '46%',
      height: 56,
      backgroundColor: 'red',
      borderRadius: 6,
      borderWidth: 0,
      color: 'white',
      fontSize: 18,
      fontWeight: 700,
      marginTop: '2.5vw',
      '&:hover': {
          opacity: 0.8
      }
  },
}));

export default Mission;