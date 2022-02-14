import React from "react";
import { makeStyles } from "@mui/styles";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Slider from "./Slider";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Upgrade() {
  const classes = useStyles();
  const [showUpgrade, setShowUpgrade] = React.useState(false);

  function handleUpgrade() {
    setShowUpgrade(true);
  }

  function handleBack() {
    setShowUpgrade(false);
  }

  return (
    <Box className={classes.upgrade}>
      {!showUpgrade
        ?
        <>
          <Slider />
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpgrade}
            sx={{
              borderRadius: 999,
              marginTop: '5rem',
              textTransform: "capitalize",
            }}>
            Upgrade Now!
          </Button>
        </>
        :
        <Box style={{height:"100%"}}>
          <Box className={classes.back}>
            <IconButton aria-label="delete" onClick={handleBack} style={{background:"#EFEFEF",marginRight:10}}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h4">Back</Typography>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.itemLeft}>
              <Typography variant="h3">Monthly</Typography>
              <Typography variant="h6">For just six bucks a month, you get nearly unlimited game play and premium access!</Typography>
            </Box>
            <Box className={classes.itemRight}>
              <Typography variant="h3" >$6.00</Typography>
              <Button size="small" variant="contained" color="primary">SELECT</Button>
            </Box>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.itemLeft}>
              <Typography variant="h3" >Yearly</Typography>
              <Typography variant="h6">Monthly plan costs $72 per year. Save a whopping 33%  with Yearly plan!</Typography>
            </Box>
            <Box className={classes.itemRight}>
              <Typography variant="h3" >$48.00</Typography>
              <Button size="small" variant="contained" color="primary">SELECT</Button>
            </Box>
          </Box>
          <Box className={classes.item}>
            <Box className={classes.itemLeft}>
              <Typography variant="h3" >Lifetime</Typography>
              <Typography variant="h6">Not a fan of subscriptions?Here is a one-time payment plan!</Typography>
            </Box>
            <Box className={classes.itemRight}>
              <Typography variant="h3" >$99.00</Typography>
              <Button size="small" variant="contained" color="primary">SELECT</Button>
            </Box>
          </Box>
        </Box>
      }
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
  upgrade: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "center",
    padding:"1.6rem",
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem 0'
  },
  item: {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: "1.43rem",
    padding: '2.286rem',
    flexDirection: 'row',
    marginBottom: '1.25rem',
    cursor: 'pointer',
    boxShadow: "0px 16px 40px rgba(205, 205, 205, 0.01)",
    transition: "box-shadow 0.2s ease-in",
    '&:hover':{
      boxShadow: "0px 16px 40px rgba(205, 205, 205, 0.44)",
      border:'1px solid #fff'
    }
  },
  itemLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingRight:'2.286rem',
    "& h3":{
      marginBottom:"4px",
    }
  },
  itemRight: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    "& h3":{
      marginBottom:"4px",
    }
  }
}));


