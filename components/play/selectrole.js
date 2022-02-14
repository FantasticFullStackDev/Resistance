import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import NanoBar from '../../components/NanoBar';
import greenrect from '../../public/images/greenrect.png';
import greenrectdown from '../../public/images/greenrectdown.png';
import whiterect from '../../public/images/whiterect.png';
import whiterectdown from '../../public/images/whiterectdown.png';
import team_spy from '../../public/images/team_spy.png';
import team_resistance from '../../public/images/team_resistance.png';
import coin from '../../public/images/coin.png';

const SelectRole = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [showBar, setShowBar] = useState(true);
    const [role, setRole] = useState('');

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Custom Functions -----
    const handleTimerEnd = () => {
        setShowBar(false);
        var temp = ['resistance', 'spy'];
        setRole(temp[Math.floor(Math.random() * 10 % 2)])
    }

    //----- Render -----
    return (
        <div className={classes.wrapper}>
            <div className={classes.spyBox} onClick={()=>setRole('spy')}>
                <div style={{width: '100%'}}>
                    <img src={team_spy.src} alt='team_spy' style={{width: '100%', height: 'auto', borderTopLeftRadius: '0.5vw', borderTopRightRadius: '0.5vw'}} />
                </div>
                <div style={{width: '100%', marginTop: -4, position: 'relative'}}>
                    <img src={role==='spy'?greenrect.src:whiterect.src} alt='whiterect' style={{width: '100%', height: 'auto'}} />
                    <div className={classes.detail} style={{top: '0.7vw', right: '10%', justifyContent: 'flex-end'}}>
                        Spy
                        <span>
                            5
                            <img src={coin.src} alt='coin' style={{marginLeft: 5}}/>
                        </span>
                    </div>
                </div>
            </div>
            <div className={classes.resistanceBox} onClick={()=>setRole('resistance')}>
                <div style={{width: '100%', position: 'relative'}}>
                    <img src={role==='resistance'?greenrectdown.src:whiterectdown.src} alt='whiterect' style={{width: '100%', height: 'auto'}} />
                    <div className={classes.detail} style={{top: '1vw', left: '10%'}}>
                        <span style={{marginLeft: 0, marginRight: 12}}>
                            5
                            <img src={coin.src} alt='coin' style={{marginLeft: 5}}/>
                        </span>
                        Resistance
                    </div>
                </div>                
                <div style={{width: '100%'}}>
                    <img src={team_spy.src} alt='team_spy' style={{width: '100%', height: 'auto', borderBottomLeftRadius: '0.5vw', borderBottomRightRadius: '0.5vw', marginTop: -4}} />
                </div>
            </div>
            <div className={classes.description}>Select your preferred role! <br/> Otherwise, a role will be <br/> randomly assigned</div>
            {showBar && <NanoBar time={5} onEnd={handleTimerEnd}/>}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
      cursor: 'pointer'
  },
  spyBox: {
      width: '100%',
      marginTop: '2vw',
      cursor: 'pointer'
  },
  resistanceBox: {
      width: '100%',
      marginTop: '-0.5vw',
  },
  detail: { 
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    color: 'black',
    '@media(max-width: 1500px)' : {
        fontSize: 18,
    },
    '@media(max-width: 1200px)' : {
        fontSize: 16,
    },
    '& span': {
        width: 'fit-content',
        background: '#4E3EC8',
        borderRadius: 5,
        padding: '0.3vw 0.6vw',
        marginLeft: 12,
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        '& img': {
            width: 20,
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
  description: {
      width: '100%',
      padding: '1vw',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '1.5vw',
      fontSize: 18,
      lineHeight: '24.5px',
      color: 'white',
    '@media(max-width: 1550px)' : {
      fontSize: 16,
      lineHeight: '21px',
    },
    '@media(max-width: 1200px)' : {
        fontSize: 14,
      lineHeight: '19px',
    },
  }
}));

export default SelectRole;