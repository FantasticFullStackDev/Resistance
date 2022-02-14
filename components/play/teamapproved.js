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
import smallCheck from '../../public/images/small_check.png';
import smallFail from '../../public/images/small_fail.png';
import bigApproved from '../../public/images/bigapproved.png';

const TeamApproved = (props) => {
    //----- others ------
    const classes = useStyles();

    //----- Global State -----
    const members = useSelector(_getTeamMembers);

    //----- Navigate -----
    // let navigate = useNavigate();

    //----- Internal States -----
    const [approved, setApproved] = useState(false);
    const [voteTrack, setVoteTrack] = useState([
        {
            name: 'lane',
            avatar: av1
        },
        {
            name: 'lane',
            avatar: av1
        },
        {
            name: 'lane',
            avatar: av1
        },
        {
            name: 'lane',
            avatar: av1
        },
    ])
    const [approvedMembers, setApprovedMembers] = useState([
        { name: 'Mike' },
        { name: 'Anna' },
        { name: 'Jimmy' },
        { name: 'Duma' },
        { name: 'Nina' },
        { name: 'Harry' },
    ]);
    const [rejectedMembers, setRejectedMembers] = useState([
        { name: 'James' },
        { name: 'Beck' },
        { name: 'Richard' },
        { name: 'Marilyn' },
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
            <div className={classes.title}>Team Approved!</div>          
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '2.5vw'}}> 
                <img src={bigApproved.src} alt='arrow' style={{width: '4.2vw', height: 'auto'}} />
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}> 
                {
                    voteTrack.map((item) => {
                        return (
                                <div className={classes.voteAvatar}>
                                    <img src={item.avatar.src} alt='voteAvatar' style={{width: '100%', height: 'auto', borderRadius: '50%'}} />
                                </div>
                        )
                    })
                }
            </div>
            <div style={{width: '100%', textAlign: 'center', color: 'white', fontSize: 16, lineHeight: '22px', marginTop: '1.6vw'}}> Vote Track </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 6}}> 
                <div className={classes.number} style={{background: '#E22F2F'}}> 1 </div>
                <div className={classes.number} style={{background: '#E22F2F'}}> 2 </div>
                <div className={classes.number} style={{background: '#E22F2F'}}> 3 </div>
                <div className={classes.number} style={{background: '#E22F2F'}}> 4 </div>
                <div className={classes.number} style={{background: '#07A603', marginRight: 0}}> 5 </div>
            </div>
            <div className={classes.resultbox}>
                <div className={classes.result}> Vote Result </div>
                <div style={{width: '100%', marginTop: '1.6vw'}}>
                    {
                        approvedMembers.map((item) => {
                            return (
                                <div className={classes.item} key={item.name}> 
                                    <div>{item.name} </div>
                                    <img src={smallCheck.src} alt='check' />
                                </div>
                            )
                        })
                    }       
                    {
                        rejectedMembers.map((item) => {
                            return (
                                <div className={classes.item} key={item.name}> 
                                    <div>{item.name} </div>
                                    <img src={smallFail.src} alt='check' />
                                </div>
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
  title: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 700,
      fontSize: '1.6vw',
      lineHeight: '1.8vw'
  },
  voteAvatar: {
      width: 68,
      height: 68, 
      border: '1px solid white', 
      borderRadius: '50%',  
      '@media(max-width: 1550px)' : {
        width: 60,
        height: 60, 
      },
      '@media(max-width: 1200px)' : {
        width: 50,
        height: 50, 
      },
  },
  number : {
      width: 40,
      height: 40,
      borderRadius: '50%',
      color: 'white',
      marginRight: 10,
      padding: '9px 12px',
      fontSize: 16,
      lineHeight: '22px',
      textAlign: 'center'
  },
  imgwrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
  },
  resultbox: {
      padding: '2vw 1.3vw',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 20,
      marginTop: '2.5vw',
      display: 'flex',      
      flexDirection: 'column'
  },
  result: {
      padding: '6px 20px',
      background: '#4E3EC8',
      borderRadius: 33,
      fontSize: 18,
      lineHeight: '25px',
      fontWeight: 'bold',
      color: 'white',
      width: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto',      
      '@media(max-width: 1200px)' : {
        fontSize: 14,
        lineHeight: '19px'
      },
  },
  item: {
      padding: '0.35vw 1vw',
      borderRadius: '5px',
      background: 'white',
      float: 'left',
      marginBottom: 10,
      marginLeft: 10,
      color: 'black',
      '& div': {
          float: 'left',
          fontSize: 16,
          lineHeight: '22px',
          '@media(max-width: 1200px)' : {
                fontSize: 13,
                lineHeight: '19px'
            },          
      },
      '& img' : {
          marginLeft: 3,
          marginTop: 1
      }
  }
}));

export default TeamApproved;