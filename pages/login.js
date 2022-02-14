import React from "react";
import Image from 'next/image';
import { Box } from "@mui/system";
import { makeStyles } from '@mui/styles';
import { Grid, IconButton } from "@mui/material";

// Images
import bg from '../public/images/background.png';
import logo from '../public/images/logo2.png';

// Icons
import AppleIcon from "../assets/icons/AppleIcon";
import GoogleIcon from "../assets/icons/GoogleIcon";
import FacebookIcon from "../assets/icons/FacebookIcon";

// Next Authentication
import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react"

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps({ req }) {
  const session = await getSession(req);
  const csrfToken = await getCsrfToken();
  const providers = await getProviders();

  if (session && session.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: { providers, session, csrfToken },
  }
}

export default function SignIn({ providers }) {
  //----- classes ------
  const classes = useStyles();

  return (
    <Box className={classes.loginWrapper}>
      <Grid className={classes.loginContainer} container>
        <Grid className={classes.loginMain} item xs={12}>
          <Box className={classes.imageContainer}>
            <Image className={classes.image} src={logo} alt="Resistance" />
          </Box>
          <Box className={classes.buttonContainer}>
            {providers && Object.values(providers).map((provider) => (
              <IconButton
                color="primary"
                key={provider.id}
                variant="contained"
                onClick={() => signIn(provider.id)}
                aria-label={provider.name + "Login"}
                className={classes.button + " " + provider.id}>
                {provider.id === "apple" && <AppleIcon className={classes.icon} />}
                {provider.id === "facebook" && <FacebookIcon className={classes.icon} />}
                {provider.id === "google" && <GoogleIcon className={classes.icon} />}
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  loginWrapper: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundImage: `url(${bg.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'top center',
  },
  loginContainer: {
    flex: 1
  },
  loginMain: {
    // display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  imageContainer: {
    marginTop: 'calc(50vh - 180px)',
    // flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    maxWidth: "46rem",
    height: "12.8rem",
  },
  buttonContainer: {
    marginTop: 100,
    // flex: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: "8.8rem",
    height: "8.8rem",
    margin: "1.6rem !important",
    '&.apple': {
      backgroundColor: "#ffffff",
    },
    '&.facebook': {
      backgroundColor: "#4267B2",
    },
    '&.google': {
      backgroundColor: "#DB4437",
    },
    '&.snapchat': {
      backgroundColor: "#FFFC00",
    }
  },
  icon: {
    width: "4.8rem !important",
    height: "4.8rem !important",
  },
}));