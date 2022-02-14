import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Members from '../components/play/members';
import Rightdiv from '../components/play/rightdiv';
import Header from '../components/play/header';
import Mainpart from '../components/play/mainpart';
import Spy from '../components/play/spy';
import Resistance from '../components/play/resistance';
import LeaderForPlayer from '../components/play/leaderforplayer';
import TeamReviewForPlayer from '../components/play/teamreviewforplayer';
import StartMission from '../components/play/startmission';
import Leader from '../components/play/leader';
import Paused from '../components/play/paused';
import TeamApproved from '../components/play/teamapproved';
import TeamRejected from '../components/play/teamrejected';
import Mission from '../components/play/mission';
import TapCardForLeader from '../components/play/tapcardforleader';
import MissionResult from '../components/play/missionresult';
import Result from '../components/play/result';
import PlayAgain from '../components/play/playagain';
import SelectRole from '../components/play/selectrole';
import bg2 from '../public/images/background2.png';

const Play = (props) => {
    //----- classes ------
    const classes = useStyles();
    
    //----- Global States -----
    // const leftnavDisplay = useSelector(getLeftnavDisplay);

    //----- Dispatch -----
    // const dispatch = useDispatch();

    //----- Internal States -----
    const [temp, setTemp] = useState('temp');

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Render -----
    return (
        <div className={classes.flex_container}>
            <Router>
                <Members />
                <Rightdiv >
                    <Header />
                    <Mainpart >
                        <Routes>
                            <Route path="/play/spy" element={<Spy />} />
                            <Route path="/play/resistance" element={<Resistance />} />
                            <Route path="/play/leader" element={<Leader />} />
                            <Route path="/play/leaderforplayer" element={<LeaderForPlayer />} />
                            <Route path="/play/teamreviewforplayer" element={<TeamReviewForPlayer />} />
                            <Route path="/play/startmission" element={<StartMission />} />
                            <Route path="/play/paused" element={<Paused />} />
                            <Route path="/play/teamapproved" element={<TeamApproved />} />
                            <Route path="/play/teamrejected" element={<TeamRejected />} />
                            <Route path="/play/mission" element={<Mission />} />
                            <Route path="/play/tapcardforleader" element={<TapCardForLeader />} />
                            <Route path="/play/missionresult" element={<MissionResult />} />
                            <Route path="/play/result" element={<Result />} />
                            <Route path="/play/playagain" element={<PlayAgain />} />
                            <Route path="/play/selectrole" element={<SelectRole />} />
                        </Routes>
                    </Mainpart>
                </Rightdiv>
            </Router>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    flex_container: {
        display: 'flex',
        alignItems: 'stretch',
        width: '100%',
        minHeight: '100vh',
        flexDirection: 'row',
        backgroundSize: 'cover',
        backgroundImage: `url(${bg2.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'top center',      
    },
}));

export default Play;