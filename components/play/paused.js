import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import warning from '../../public/images/warning.png';

const Paused = (props) => {
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

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Render -----
    return (
        <div className={classes.wrapper}> 
            <div className={classes.paused} >
                <div style={{display: 'flex', width: '100%'}}>
                    <img src={warning.src} alt='warning' style={{width: 50, height: 'auto', margin: '0px auto' }}/>
                </div>
                <div className={classes.title}> Game Paused </div>
                <div className={`${classes.title} ${classes.detail}`}> Game automatically resumes when players return to app </div>
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
  detail: {
      fontSize: '1.2vw',
      lineHeight: '1.8vw',
      fontWeight: 'normal',
      '@media(max-width: 1550px)' : {
        fontSize: 20,
        lineHeight: '28px',
      },
      '@media(max-width: 1200px)' : {
        fontSize: 18,        
        lineHeight: '24px',
      },
  },
  waiting: {
      marginTop: '4.2vw',
      padding: '6px 20px',
      background: '#4E3EC8',
      borderRadius: 33,
      fontSize: 18,
      lineHeight: '25px',
      fontWeight: 'bold',
      color: 'white',
      width: 'fit-content',  
      '@media(max-width: 1200px)' : {
        fontSize: 14,
        lineHeight: '19px'
      },
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
      lineHeight: '22px',
      '@media(max-width: 1200px)' : {
        fontSize: 13,
        lineHeight: '19px'
      }, 
  }
}));

export default Paused;