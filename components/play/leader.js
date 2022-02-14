import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import { _getTeamMembers } from '../../reducer/teammembersSlice';
import avatar from '../../public/images/avatar.jpg';
import av1 from '../../public/images/av1.png';
import av2 from '../../public/images/av2.png';
import av3 from '../../public/images/av3.png';
import av4 from '../../public/images/av4.png';
import arrow from '../../public/images/arrow.png';
import teamwork from '../../public/images/teamwork.png';

const Leader = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Global State -----
    const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    // const [temp, setTemp] = useState(true);

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Custom Functions -----
    

    //----- Render -----
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>Team Leader</div>
            <div className={classes.imgwrapper}>
                <img src={avatar.src} className={classes.avatar} alt='avatar' />
            </div>            
            <div className={classes.imgwrapper}>
                <div className={classes.groupbox} style={{border: '4px solid #07A603'}}>
                    <div className={classes.headline}>
                        <img src={teamwork.src} className={classes.teamwork} alt='teamworkbadge' />
                        Team Members
                    </div>
                    <div className={classes.detail} style={{display: members.length?'none':'block'}}>
                        Select 4 Team Members <br/> by clicking directly on <br/> their video feed!
                    </div>
                    <div className={classes.members} style={{display: members.length?'block':'none'}}>
                        <div className={classes.member}>
                            <div className={classes.memberImgBox} style={{border: '1px solid white'}}>
                                <img src={members[0]?.avatar.src} className={classes.memberAvatar} alt='memberAvatar' />
                            </div>
                            <div className={classes.memberName}>
                                {members[0]?.name}
                            </div>
                        </div>
                        <div className={classes.member}>
                            <div className={classes.memberImgBox} style={{border: members.length >= 2 ?'1px solid white':'1px dashed white'}}>
                                <img src={members[1]?.avatar.src} style={{display: members[1]?'block':'none'}} className={classes.memberAvatar} alt='memberAvatar' />
                            </div>
                            <div className={classes.memberName}>
                                {members[1]?members[1].name:'Select 2nd Member'}
                            </div>
                        </div>
                        <div className={classes.member}>
                            <div className={classes.memberImgBox} style={{border: members.length >= 3 ?'1px solid white':'1px dashed white'}}>
                                <img src={members[2]?.avatar.src} style={{display: members[2]?'block':'none'}} className={classes.memberAvatar} alt='memberAvatar' />
                            </div>
                            <div className={classes.memberName}>
                                {members[2]?members[2].name:'Select 3nd Member'}
                            </div>
                        </div>
                        <div className={classes.member}>
                            <div className={classes.memberImgBox} style={{border: members.length === 4 ?'1px solid white':'1px dashed white'}}>
                                <img src={members[3]?.avatar.src} style={{display: members[3]?'block':'none'}} className={classes.memberAvatar} alt='memberAvatar' />
                            </div>
                            <div className={classes.memberName}>
                                {members[3]?members[3].name:'Select 4nd Member'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: 10}}> 
                <img src={arrow.src} alt='arrow' />
            </div>       
            <button className={classes.button} style={{display: members.length !== 4 ? 'none': 'block'}}>Confirm Team</button>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
  },
  title: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '1.6vw',
      lineHeight: '1.8vw'
  },
  imgwrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
  },
  avatar: {
      width: 204,
      height: 204,
      borderRadius: 36,
      border: '4px solid white',
      marginTop: '2.4vw',
  },
  groupbox: {
      width: 383,
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '2.5vw',
      padding: '1.3vw 1.6vw'
  },
  teamwork: {
      width: 24,
      height: 24,
      marginRight: 7
  },
  headline: {
      color: 'white',
      fontSize: 18,
      lineHeight: '24px'
  },
  detail: {
      color: 'white',
      fontSize: '1.2vw',
      lineHeight: '1.8vw',
      fontWeight: 600,
      textAlign: 'center',
      marginTop: '4.8vw',
      marginBottom: '6vw'
  },
  members: {
      width: '100%',
  },
  member: {
      width: '100%',
      position: 'relative',
      marginTop: '1.7vw'
  },
  memberImgBox: {
      width: 50,
      height: 50,
      background: 'rgba(255, 255, 255, 0.2)',
      boxSizing: 'border-box',
      borderRadius: '50%',
      float: 'left',
      marginRight: '1vw',
      '@media(max-width: 1400px)' : {
        width: 40,
        height: 40,
      },
  },
  memberAvatar: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid white'
  },
  memberName: {
      fontSize: 24,
      lineHeight: '50px',
      fontWeight: 600,
      color: 'white',
      '@media(max-width: 1850px)' : {
        fontSize: 21
      },
      '@media(max-width: 1650px)' : {
        fontSize: 18
      },
      '@media(max-width: 1400px)' : {
        fontSize: 16,
        lineHeight: '40px',
      },
      '@media(max-width: 1100px)' : {
        fontSize: 14,
        lineHeight: '40px',
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
      '&:hover': {
          opacity: 0.8
      }
  }
}));

export default Leader;