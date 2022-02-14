import React from "react";
import { makeStyles } from '@mui/styles';
// import { useParams } from "react-router-dom";
import { useRouter } from 'next/router';

// Resources
import bg from '../../public/images/background.png';

// Components
import Help from "../../components/settings/Help";
import Share from "../../components/settings/Share";
import GetCoin from "../../components/settings/GetCoin";
import Upgrade from "../../components/settings/Upgrade";
import Profile from "../../components/settings/Profile";
import Sidebar from "../../components/settings/Sidebar";
import CoinHistory from "../../components/settings/CoinHistory";
import { Grid, Box } from "@mui/material";

// import {useNavigate} from "react-router-dom";

export default function SettingsView(props) {
    const router = useRouter();
    const classes = useStyles();
    const page = router.query.page;

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.main}>
                <Box className={classes.content}>
                    <Sidebar />
                    <Grid className={classes.body}>
                        {page === "upgrade" && <Upgrade />}
                        {page === "profile" && <Profile />}
                        {page === "share" && <Share />}
                        {page === "get-coins" && <GetCoin />}
                        {page === "coin-history" && <CoinHistory />}
                        {page === "help" && <Help />}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapper: {
        background: '#fafafa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: '#555',
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
    },
    main: {
        width: '100%',
        flex: 1,
        display: 'flex',
        background: "rgba(0, 0, 0, 0.5)",
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        maxWidth: 1024,
        height: 635,
        flex: 1,
        display: 'flex',
        background: "#fff",
        borderRadius: '20px',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    body: {
        background: "#fff",
        width: '68%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '3.2rem',
        alignItems:"stretch"
    }
}));
