import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import NanoBar from '../../components/NanoBar';
import resistance from '../../public/images/resistance.png';

const Resistance = (props) => {
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
        <div className={classes.resistance}>
            <img className={classes.image} src={resistance.src} alt='resistance' />
            <div className={classes.descriptionbox}>
                <p style={{fontSize: '1.1vw'}}>Starting Soon!</p>
                <p style={{fontSize: '0.8vw'}}>Team Leader will be randomly <br/> assigned and the missions begin!</p>
            </div>
            {showBar && <NanoBar time={10} onEnd={handleTimerEnd}/>}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  resistance: {
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
      padding: '2vw 3vw',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      color: 'white',
      textAlign: 'center'
  }
}));

export default Resistance;