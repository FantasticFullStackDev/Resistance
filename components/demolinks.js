import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import Link from 'next/link'

const DemoLinks = (props) => {
    //----- classes ------
    const classes = useStyles();
    
    //----- Global States -----
    // const leftnavDisplay = useSelector(getLeftnavDisplay);

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
            <h1 style={{color: 'white'}} onClick={()=>navigate('/play/aaa')}>Go To AAA</h1>
            <h1 style={{color: 'white'}} onClick={()=>navigate('/play/bbb')}>Go To BBB</h1>
            <h1 style={{color: 'white'}} onClick={()=>navigate('/play/')}>Go Back</h1>
            <Link href='/'><h1 style={{color: 'white'}}>Go To Home</h1></Link>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
  demo: {
      display: 'none'
  },
}));

export default DemoLinks;