import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';

const Mainpart = (props) => {
    //----- classes ------
    const classes = useStyles();

    //----- Global States -----
    // const leftnavDisplay = useSelector(getLeftnavDisplay);

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [temp, setTemp] = useState('temp');

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Render -----
    return (
        <div className={classes.mainpart}>
            {props.children}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    mainpart: {
        width: '100%', 
        minHeight: 300,
        marginTop: '1.5vw',
    },
}));

export default Mainpart;