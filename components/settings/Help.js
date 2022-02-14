import * as React from "react";
import { makeStyles } from "@mui/styles";
import { BugIcon, EmailIcon, LicenceIcon, PrivacyIcon, TermsIcon } from "../../resources/ResistanceIcons";
import { Grid, Typography, Box } from "@mui/material";


export default function Help() {
  const classes = useStyles();

  return (
    <Box className={classes.help}>
      <Grid className={classes.item}>
        <Box className={classes.card}>
          <BugIcon style={{ width: 72, height: 72 }} />
          <Typography variant="h5" sx={{fontWeight:600}}>Report Bug</Typography>
        </Box>
      </Grid>
      <Grid className={classes.item}>
        <Box className={classes.card}>
          <EmailIcon style={{ width: 72, height: 72 }} />
          <Typography variant="h5" sx={{fontWeight:600}}>Contact Us</Typography>
        </Box>
      </Grid>
      <Grid className={classes.item}>
        <Box className={classes.card}>
          <TermsIcon style={{ width: 72, height: 72 }} />
          <Typography variant="h5" sx={{fontWeight:600}}>Terms of Service</Typography>
        </Box>
      </Grid>
      <Grid className={classes.item}>
        <Box className={classes.card}>
          < PrivacyIcon style={{ width: 72, height: 72 }} />
          <Typography variant="h5" sx={{fontWeight:600}}>Privacy Policy</Typography>
        </Box>
      </Grid>
      <Grid className={classes.item}>
        <Box className={classes.card}>
          <LicenceIcon style={{ width: 72, height: 72 }} />
          <Typography variant="h5" sx={{fontWeight:600}}>Licence</Typography>
        </Box>
      </Grid>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  help: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems:"top",
    padding:"1.6rem",
  },
  item: {
    width: "30%",
    margin: "1.66%",
    paddingBottom: "30%",
    position: "relative"
  },
  card: {
    position: "absolute",
    height: "90%",
    width: "90%",
    padding: "5%",
    border: "1px solid #f3f3f3",
    boxShadow: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "6px",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #ffffff",
      boxShadow:"0px 14px 40px rgba(205, 205, 205, 0.26)",
    }
  }
}));


