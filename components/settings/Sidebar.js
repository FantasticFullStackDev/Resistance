import React from "react";
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import { useSession, signOut, getSession } from 'next-auth/react';
// import { useNavigate} from "react-router-dom";

import {
    ProfileIcon, CrownIcon, ShareIcon, HelpIcon,
    GetCoinIcon, CoinHistoryIcon, LogoutIcon
} from '../../resources/ResistanceIcons';

// import { Link } from "react-router-dom";
import Link from "next/link";
import { Box, Typography, ListItemIcon, ListItemText, MenuList, MenuItem } from "@mui/material";

export default function Sidebar(props) {
    const classes = useStyles();
    // const navigate = useNavigate();
    const router = useRouter();

    return (
        <Box className={classes.sidebar}>
            <Typography sx={{ paddingLeft: "16px" }} variant="h2">Menu</Typography>
            <MenuList sx={{ width: "100%" }}>
                <MenuItem className={classes.item}>
                    <Link href='/settings/upgrade'>
                        <a className={classes.link}>
                            <ListItemIcon> <CrownIcon style={{ height: 24, width: 24 }} fill="#FF5441" /></ListItemIcon>
                            <ListItemText> <Typography variant="h4">Reasons to Upgrade</Typography></ListItemText>
                        </ a>
                    </Link>
                </MenuItem>
                <MenuItem className={classes.item}>
                    <Link href='/settings/profile' >
                        <a className={classes.link}>
                            <ListItemIcon> <ProfileIcon style={{ height: 24, width: 24 }} /></ListItemIcon>
                            <ListItemText> <Typography variant="h4">My Profile</Typography></ListItemText>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem className={classes.item}>
                    <Link href='/settings/share' className={classes.link}>
                        <a className={classes.link}>
                        <ListItemIcon> <ShareIcon style={{ height: 24, width: 24 }} /></ListItemIcon>
                        <ListItemText> <Typography variant="h4">Recommend to Friend</Typography></ListItemText>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem className={classes.item}>
                    <Link href='/settings/get-coins' className={classes.link}>
                        <a className={classes.link}>
                        <ListItemIcon> <GetCoinIcon style={{ height: 24, width: 24 }} /></ListItemIcon>
                        <ListItemText> <Typography variant="h4">Get Coins</Typography></ListItemText>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem className={classes.item}>
                    <Link href='/settings/coin-history' className={classes.link}>
                        <a className={classes.link}>
                        <ListItemIcon> <CoinHistoryIcon style={{ height: 24, width: 24 }} /></ListItemIcon>
                        <ListItemText> <Typography variant="h4">Coin History</Typography></ListItemText>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem className={classes.item}>
                    <Link href='/settings/help' className={classes.link}>
                        <a className={classes.link}>
                        <ListItemIcon> <HelpIcon style={{ height: 24, width: 24 }} /></ListItemIcon>
                        <ListItemText> <Typography variant="h4">Help</Typography></ListItemText>
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem className={classes.item} onClick={signOut}>
                    <Box className={classes.link}>
                        <ListItemIcon> <LogoutIcon style={{ height: 24, width: 24 }} /></ListItemIcon>
                        <ListItemText > <Typography variant="h4">Log Out</Typography></ListItemText>
                    </Box>
                </MenuItem>
            </MenuList>
        </Box>
    );
}

const useStyles = makeStyles(theme => ({
    sidebar: {
        background: "#f2f2f2",
        width: '32%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        paddingLeft: '16px',
        justifyContent: 'center',
    },
    item: {
        borderRadius: '16px 0 0 16px !important',
        padding: '0 !important',
        width: '100%',
        '&:hover': {
            background: '#ffffff !important',
        },
        '& a': {
            textDecoration: 'none',
        }
    },
    link: {
        width: '100%',
        padding: '16px !important',
        display: "flex",
        textWrap: "wrap",
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: "row",
    }

}));