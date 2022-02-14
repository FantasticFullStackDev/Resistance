import {useState}  from 'react';
import { makeStyles } from '@mui/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, Typography, MobileStepper } from '@mui/material/';
// Resources
import img1 from '../../public/images/dimond.png';
import img2 from '../../public/images/discount.png';
import img3 from '../../public/images/gold.png';
import img4 from '../../public/images/premium.png';

import Image from 'next/image';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Slider() {
  const maxSteps = 4;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box>
      <AutoPlaySwipeableViews
        interval={5000}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
        <div key="1">
          <Image src={img1} className={classes.image} alt="Premium Benefits" />
          <Typography className={classes.h1} variant="h2">Premium Benefits</Typography>
          <Typography className={classes.p} variant="h4" sx={{fontWeight:400}}>
            50% Discount on Gold Coins <br />
            Get 100 FREE Gold Coins Every Month <br />
            Premium Access to Mafia, Werewolf & Avalon
          </Typography>
        </div>
        <div key="2">
          <Image src={img2} className={classes.image} alt="Massive Discount" />
          <Typography  className={classes.h1} variant="h2">Massive Discount</Typography>
          <Typography className={classes.p} variant="h4" sx={{fontWeight:400}}>
            Get a huge 50% discount on Gold Coins!<br/>
            In other words, double the gold for your money!<br/>
            Your Gold coins can be spent in any game!
          </Typography>
        </div>
        <div key="3">
          <Image src={img3} className={classes.image} alt="Free Gold" />
          <Typography  className={classes.h1} variant="h2">Free Gold</Typography>
          <Typography className={classes.p} variant="h4" sx={{fontWeight:400}}>
            Get 100 Gold Coins every month!<br/>
            This premium feature alone is worth $10/month<br/>
            Unused coins stay in your account and rollover!
          </Typography>
        </div>
        <div key="4">
          <Image src={img4} className={classes.image} alt="Preminum Access" />
          <Typography  className={classes.h1} variant="h2">Preminum Access</Typography>
          <Typography className={classes.p} variant="h4" sx={{fontWeight:400}}>
            Get Premium Access to all our social games:<br/>
            Mafia, Werewolf, Resistance & Avalon!<br/>
            Your Gold Coins can be spent in any game!
          </Typography>
        </div>
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          backgroundColor:"transparent !important"
        }}/>
    </Box>
  );
}

const useStyles = makeStyles(theme=>({
  image:{
    maxHeight:"75px",
    height: "100% !important",
    width: "auto !important",
    marginBottom: "2.7rem  !important"
  },
  h1:{
    marginBottom: "2.7rem !important"
  },
  p:{
    marginBottom: "2.7rem !important"
  }
}));
