import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import { useRouter } from "next/router";
import NanoBar from '../../components/NanoBar';
import { _getTeamMembers } from '../../reducer/teammembersSlice';
import { _getGameState, _setGameState } from '../../reducer/gamestateSlice';
import arrow from '../../public/images/arrow.png';
import coin from '../../public/images/coin.png';
import warning from '../../public/images/warning.png';

const PlayAgain = (props) => {
    //----- others ------
    const classes = useStyles(); 
    const router = useRouter();

    //----- Global State -----
    const _members = useSelector(_getTeamMembers);
    const _gameState = useSelector(_getGameState);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [joinedMembers, setJoinedMembers] = useState([
        { name: 'Mike' },
        { name: 'Anna' },
        { name: 'Jimmy' },
        { name: 'Duma' },
        { name: 'Nina' },
    ]);
    const [missingMembers, setMissingMembers] = useState([
        { name: 'Emily' },
        { name: 'Eva' },
        { name: 'Joana' },
        { name: 'Apple' },
    ]);
    const [showBar, setShowBar] = useState(true);

    //----- Lifecycle Events -----
    useEffect(() => {
        dispatch(_setGameState('waiting'));
    }, [])

    useEffect(() => {
        if(joinedMembers.length === 10)
            setShowBar(false);
    }, [joinedMembers])

    //----- Custom Functions -----
    const handleTimerEnd = () => {
        setShowBar(false);
        // alert('Timer Ended');
    }
    const startGame = () => {
        alert('Start Game')
        // router.push('/play/');
    }
    const backToHome = () => {
        router.push('/');
    }

    //----- Render -----
    return (
        <div className={classes.wrapper}>
            <div className={classes.joinedBox} style={{display: _gameState !== 'paused'? 'flex': 'none'}}>
                <div className={classes.joined}> Player Joined </div>
                <div style={{width: '100%', marginTop: '1.6vw'}}>
                    {
                        joinedMembers.map((item) => {
                            return (
                                <div className={classes.item} key={item.name}> {item.name} </div>
                            )
                        })
                    }
                </div>
            </div>   
            <div className={classes.descriptionbox} style={{display: _gameState === 'waiting'?'block':'none'}}>
                <p className={classes.title}>Starting Soon!</p>
                <p className={classes.detail}>Please wait a minute while <br/> players join the next game!</p>
            </div>
            <div style={{width: '100%', position: 'absolute', bottom: '5vw', display: _gameState==='ready'?'block':'none'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: 10}}> 
                    <img src={arrow.src} alt='arrow' className={classes.arrow}/>
                </div>       
                <button className={classes.button} onClick={startGame}>
                    Start Game
                    <span>
                        <img src={coin.src} alt='coin' style={{marginRight: 5}}/>
                        5
                    </span>
                </button>
            </div>
            <div className={classes.paused}  style={{display: _gameState==='paused'?'flex':'none'}}>
                <div style={{display: 'flex', width: '100%'}}>
                    <img src={warning.src} alt='warning' style={{width: 50, height: 'auto', margin: '0px auto' }}/>
                </div>
                <div className={classes.title1}> Game Paused </div>
                <div className={`${classes.title1} ${classes.detail1}`}> Game automatically resumes when players return to app </div>
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
            <div className={classes.paused} style={{display: _gameState==='notEnough'?'block':'none'}}>
                <div style={{display: 'flex', width: '100%'}}>
                    <img src={warning.src} alt='warning' style={{width: 50, height: 'auto', margin: '0px auto' }}/>
                </div>
                <div className={classes.title1}> Not Enough Players </div>
                <div className={`${classes.title1} ${classes.detail1}`}> At least five players are <br/> needed for a game! </div>
            </div>
            <div style={{width: '100%', position: 'absolute', bottom: '5vw', display: _gameState==='notEnough'?'block':'none'}}>     
                <button className={classes.button} style={{background: '#FFBF3A', color: 'black'}} onClick={backToHome}> Back to Home </button>
            </div>
            {showBar && <NanoBar time={5} onEnd={handleTimerEnd}/>}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
      position: 'relative',
      minHeight: 'calc(100vh - 100px)'
  },
 joinedBox: {
      padding: '2vw 1.6vw',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '2.5vw',
      display: 'flex',      
      flexDirection: 'column'
  },
  joined: {
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
  },
  descriptionbox: {
      position: 'absolute',
      bottom: '5vw',
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
  },
  imgwrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
  },
  arrow: {
      width: 16,
      height: 'auto',
      '@media(max-width: 1500px)' : {
          width: 14,
      },
      '@media(max-width: 1200px)' : {
          width: 12,
      },
  },
  button: {
      width: '100%',
      height: 56,
      backgroundColor: '#4E3EC8',
      borderRadius: 6,
      borderWidth: 0,
      color: 'white',
      fontSize: 18,
      fontWeight: 700,
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
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
      },
      '& span': {
          background: 'rgba(255, 255, 255, 0.16)',
          borderRadius: 86,
          padding: '5px 8px',
          marginLeft: 5,
          display: 'flex',
          alignItems: 'center',
          '& img': {
              width: 21,
              height: 'auto',
                '@media(max-width: 1500px)' : {
                    width: 18
                },
                '@media(max-width: 1200px)' : {
                    width: 16
                },
          }
      }
  },
  paused: {
      padding: '2vw 1.3vw',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '2.5vw',
      display: 'flex',      
      flexDirection: 'column'
  },
  title1: {
      width: '100%', 
      marginTop: '2vw', 
      color: 'white', 
      fontWeight: 600,
      fontSize: '1.5vw',
      lineHeight: '40px',
      textAlign: 'center',
      '@media(max-width: 1550px)' : {
        fontSize: 25,
        lineHeight: '32px'
      },
      '@media(max-width: 1200px)' : {
        fontSize: 18,
        lineHeight: '23px'
      },
  },
  detail1: {
      fontSize: '1.2vw',
      lineHeight: '1.8vw',
      fontWeight: 'normal',
      '@media(max-width: 1550px)' : {
        fontSize: 20,
        lineHeight: '28px',
      },
      '@media(max-width: 1200px)' : {
        fontSize: 14,        
        lineHeight: '18px',
      },
  },
  waiting: {
      marginTop: '4vw',
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
}));

export default PlayAgain;