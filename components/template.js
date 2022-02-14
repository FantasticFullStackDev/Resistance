import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';

const Temp = (props) => {
    //----- classes ------
    const classes = useStyles();
    
    //----- Global States -----
    const leftnavDisplay = useSelector(getLeftnavDisplay);

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [temp, setTemp] = useState('temp');

    //----- Navigate -----
    let navigate = useNavigate();

    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    //----- Render -----
    return (
        <React.Fragment>
            <h1>Temp</h1>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
  demo: {
      display: 'none'
  },
}));

export default Temp;