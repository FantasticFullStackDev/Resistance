import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { _getMembers } from '../../reducer/membersSlice';
import { _getTeamMembers, _setTeamMembers } from '../../reducer/teammembersSlice';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import spy from '../../public/images/spy_hat.png';
import achieve from '../../public/images/achieve_badge.png';
import approved from '../../public/images/approved_badge.png';


const Members = (props) => {
    //----- Custom Consts ------
    const classes = useStyles();
    const badges = {
        spy: spy,
        achieve: achieve,
        approved: approved
    }

    //----- Global States -----
    const _members = useSelector(_getMembers);
    const _teamMembers = useSelector(_getTeamMembers);

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [members, setMembers] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    //----- Lifecycle Events -----
    useEffect(() => {
        setMembers(_members);
        setTeamMembers(_teamMembers);
    }, [])

    useEffect(() => {        
        setTeamMembers(_teamMembers);
    }, [_teamMembers])

    //----- Custom Funtions -----
    const selectMember = (img, name, badge) => {
        var newMember = {
            name: name,
            avatar: img,
            badge: badge
        };
        var currentMembers = [...teamMembers];
        if(currentMembers.length <= 4) {
            var repeat = false;
            for ( var i = 0; i < currentMembers.length; i++ ) {
                if(currentMembers[i].name === name) {
                    currentMembers.splice(i, 1);
                    repeat = true;
                    break;
                }
            }
            if(!repeat && currentMembers.length < 4)
                currentMembers.push(newMember);
            console.log(currentMembers);
            dispatch(_setTeamMembers(currentMembers));
        }
    }

    //----- Render -----
    return (
            <div className={classes.member}>
                {
                    members.map((item) => {
                        return <div className={members.length > 6 ? classes.item_25 : classes.item_33} key={item.name}>
                                    <div className={classes.video} onClick={()=>selectMember(item.img, item.name, item.badge)}>
                                        <img className={classes.image} src={item.img.src} alt='member'/>
                                        <div className={classes.name} > {item.name} </div>
                                        <img className={classes.badge} style={{display: item.badge ? 'block' : 'none'}} src={badges[item.badge]?.src} alt='badge'/>
                                    </div>
                                </div>
                    })
                }                
            </div>
    );
}

const useStyles = makeStyles((theme) => ({
    member: {
        width: '100%',
        color: 'white',
        maxHeight: '100vh',
        overflowY: 'scroll',
        padding: 40,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        '@media(max-width: 780px)' : {
            border: '1px solid blue'
        },
    },
    item_25: {
        width: '25%',
        height: 'auto',
        float: 'left',
    },
    item_33: {
        width: '33%',
        height: 'auto',
        float: 'left',
    },
    video: {
        width: '85%',
        height: '85%',
        margin: '0px 7.5% 15%',
        backgroundColor: 'grey',
        borderRadius: '10%',
        border: '3px solid white',
        position: 'relative',
        display: 'flex',        
        justifyContent: 'center',
        cursor: 'pointer'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '10%'
    },
    name: {
        borderRadius: 12,
        background: 'rgba(28, 8, 60, 0.8)',
        backdropFilter: 'blur(24px)',
        padding: '2% 4%',
        fontSize: '1vw',
        lineHeight: '1.5vw',
        position: 'absolute',
        bottom: '3%',
        left: 'auto'
    },
    badge: {
        width: '2.5vw',
        height: '2.5vw',
        borderRadius: '50%',
        position: 'absolute',
        right: '0.5vw',
        top: '0.5vw'
    }
}));

export default Members;