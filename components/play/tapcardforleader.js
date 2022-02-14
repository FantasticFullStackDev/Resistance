import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import passbig from '../../public/images/pass_big.png';
import failbig from '../../public/images/fail_big.png';
import pass from '../../public/images/pass.png';
import fail from '../../public/images/fail.png';
import arrow from '../../public/images/arrow.png';
import active from '../../public/images/w_active.png';
import inactive from '../../public/images/w_inactive.png';

const TapCardForLeader = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Global State -----
    // const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [cards, setCards] = useState([
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
            pass: true
        },
        {
            num: 3,
            tapped: false,
            pass: false
        },
        {
            num: 4,
            tapped: false,
            pass: true
        },
    ])

    const [currentNum, setCurrentNum] = useState(0);
    const [failedNum, setFailedNum] = useState(0);
    const [passedNum, setPassedNum] = useState(0);

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    useEffect(() => {
        if(failedNum === 2) {
            alert("Your team has already failed");
        } else if (passedNum === 3) {
            alert("Your team has already won");
        }
    }, [failedNum, passedNum])

    //----- Custom Functions -----
    const tapCard = (num) => {
        if(!cards[num].tapped) {
            setCurrentNum(num + 1);
            var temp = [...cards];
            temp[num].tapped = true;
            if(!temp[num].pass) {
                setFailedNum(failedNum + 1);
            } else {
                setPassedNum(passedNum + 1);
            }              
        }
    }

    //----- Render -----
    return (
        <div className={classes.wrapper}> 
            <div className={classes.title}> Result </div>
            <div className={classes.result}>
                <img src={cards[currentNum - 1]?.pass? passbig.src : failbig.src} className={classes.resultImg} style={{opacity: cards[currentNum - 1]?1:0}} alt='result'/>
            </div>    
            <div className={classes.detail}> Mission fails if 2 red cards </div>     
            <div className={classes.cardBox}>
                {
                    cards.map((item) => {
                        var state = currentNum === item.num ? active : ( !item.tapped ? inactive : (item.pass ? pass : fail));
                        return (                            
                            <div className={classes.card} onClick={()=>tapCard(item.num)}> 
                                <img src={arrow.src} style={{width: 15, height: 'auto', margin: '0px auto 6px', opacity: currentNum === item.num ? 1 : 0}}/>
                                <img src={state.src} style={{width: '100%', height: 'auto'}} alt='active' />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
  },
  result: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '3.2vw',      
  },
  resultImg: {
    width: 218, 
    height: 'auto',    
    '@media(max-width: 1550px)' : {
        width: 185
    },
    '@media(max-width: 1200px)' : {
        width: 150
    },
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
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '3.4vw',
      color: 'white',
      fontSize: '1.3vw',
      lineHeight: '1.75vw',
      textAlign: 'center',      
      '@media(max-width: 1550px)' : {
        fontSize: 21
      },
      '@media(max-width: 1200px)' : {
        fontSize: 18
      },
  },
  cardBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: 17
  }, 
  card: {
      width: 54,
      borderRadius: 3 ,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '@media(max-width: 1400px)' : {
        width: 48,
        height: 88,
      },
      '@media(max-width: 1200px)' : {
        width: 42,
        height: 77
      },
  }
}));

export default TapCardForLeader;