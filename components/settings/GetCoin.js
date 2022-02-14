import * as React from "react";
import { makeStyles } from "@mui/styles";
import { CrownIcon, } from "../../resources/ResistanceIcons";
import { Grid, Typography, Box, Button } from "@mui/material";

import Badge from '@mui/material/Badge';

import one from "../../public/images/1.png";
import two from "../../public/images/2.png";
import three from "../../public/images/3.png";
import four from "../../public/images/4.png";

import Image from "next/image";

export default function GetCoin() {
  const classes = useStyles();

  return (
    <Box className={classes.getcoin}>
      <Box className={classes.offer}>
        <CrownIcon className={classes.offerIcon} fill="#fff" />
        <Typography className={classes.offerText} variant="h5">50% Discount Applied!</Typography>
      </Box>
      <Box className={classes.items}>
        <Grid container>
          <Grid item xs={6} className={classes.item}>
            <Box className={classes.card}>
              <Box className={classes.upper}>
                <Box className={classes.box}>
                  <Image src={one} alt="Coins" />
                </Box>
              </Box>
              <Box className={classes.lower}>
                <Typography variant="h6">10 Coins</Typography>
                <Button size="small" variant="contained" color="success">$0.09</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <Box className={classes.card}>
              <Box className={classes.upper}>
                <Box className={classes.box}>
                  <Image src={two} alt="Coins" />
                </Box>
              </Box>
              <Box className={classes.lower}>
                <Typography variant="h6">100 Coins</Typography>
                <Button size="small" variant="contained" color="success">$0.09</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <Box className={classes.card}>
              <Box className={classes.upper}>
                <Box className={classes.box}>
                  <Image src={three} alt="Coins" />
                </Box>
              </Box>
              <Box className={classes.lower}>
                <Typography variant="h6">300 Coins</Typography>
                <Button size="small" variant="contained" color="success">$0.09</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.item}>
            <Box className={classes.card}>
              <Box className={classes.upper}>
                <Box className={classes.box}>
                  <Image src={four} alt="Coins" />
                </Box>
              </Box>
              <Box className={classes.lower}>
                <Typography variant="h6">2000 Coins</Typography>
                <Badge color="tertiary" overlap="circular" sx={{ "& .MuiBadge-badge": { borderRadius: 999, width: 22, height: 22, right: 4, top: 4 } }} badgeContent={<CrownIcon style={{ width: 13, height: 13 }} fill="#fff" />}>
                  <Button size="small" variant="contained" color="success">
                    $0.09
                  </Button>
                </Badge>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  getcoin: {
    display: "flex",
    width: "100%",
    height: "auto",
    flexDirection: "column",

  },
  offer: {
    display: "flex",
    flex: 1,
    textAlign: "center !important",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "50px",
  },
  offerIcon: {
    marginRight: 12,
    width: 14,
    height: 14,
    backgroundColor: "#FF5441",
    borderRadius: 999,
    padding: 4
  },
  offerText: {
    paddingTop: 4,
    fontWeight: "600 !important",
    color: "#262A41 !important"

  },
  items: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "top",
    // background: "red",
  },
  item: {
    position: "relative",
    padding: "1.6rem",
  },
  card: {
    background: "#FFE4A0",
    borderRadius: "0.6rem",
    boxShadow:"0px 4px 34px rgba(205, 205, 205, 0.26)",
    overflow: "hidden",
  },
  upper: {
    position: "relative",
    width: "100%",
    paddingTop: " 56.25%",
  },
  box: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    textAlign: "center",
    '& img':{
      height: "100%",
      width:"auto",
    }
  },

  lower: {
    height: "50px",
    padding: "0.8rem 1.6rem",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    fontSize: 300
  }
}));


