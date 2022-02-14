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
import teamwork from '../../public/images/teamwork.png';

const TeamReviewForPlayer = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Global State -----
    const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [approved, setApproved] = useState(false);
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

    //----- Custom Functions -----
    const teamApprove = () => {
        alert('You approved the team.');
        setApproved(true);
    }

    const teamReject = () => {
        alert('You rejected the team.');
    }

    //----- Render -----
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>Team Review</div>          
            <div className={classes.imgwrapper} style={{display: approved?'none':'block'}}>
                <div className={classes.groupbox} style={{border: '4px solid #07A603'}}>
                    <div className={classes.headline}>
                        <img src={teamwork.src} className={classes.teamwork} alt='teamworkbadge' />
                        Team Members
                    </div>
                    <div className={classes.members} style={{display: members.length?'block':'none'}}>
                        {
                            members.map((item) => {
                                return (
                                    <div className={classes.member} key={item.name}>
                                        <div className={classes.memberImgBox} style={{border: '1px solid white'}}>
                                            <img src={item.avatar.src} className={classes.memberAvatar} alt='memberAvatar' />
                                        </div>
                                        <div className={classes.memberName}>
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div> 
            <div className={classes.buttonContainer} style={{display: approved?'none':'flex'}}>
                <button className={classes.button} style={{backgroundColor: '#E22F2F'}} onClick={teamReject}> Reject </button>
                <button className={classes.button} style={{backgroundColor: '#07A603'}} onClick={teamApprove}> Accept </button>
            </div>   
            <div className={classes.approved} style={{display: !approved?'none':'flex'}}>
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
            <div style={{width: 'calc(100% - 2.8vw)', textAlign: 'center', color: 'white', fontSize: 24, position: 'fixed', top: 'calc(100vh - 140px)', display: !approved?'none':'block'}}>You have approved this team!</div>     
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
      width: '100%',
      position: 'relative'
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
      marginRight: 20
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
      '@media(max-width: 1350px)' : {
        fontSize: 21
      },
      '@media(max-width: 1200px)' : {
        fontSize: 18
      }
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
  approved: {
      padding: '2vw 1.6vw',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '2.5vw',
      display: 'flex',      
      flexDirection: 'column'
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

export default TeamReviewForPlayer;