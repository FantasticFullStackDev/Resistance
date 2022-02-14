import React, { useEffect } from "react";
import { Box } from "@mui/system";

import { useRouter } from "next/router";
import { getSession, useSession } from 'next-auth/react';

import {
    CircularProgress, Chip, Typography,
    Dialog, DialogContent, DialogTitle,
} from "@mui/material";

// Components
import PinInput from "../../components/PinInput";

// Resources
import { useRContext } from "../../hooks/useRContext";

// Images
import bg from '../../public/images/background.png';
import { route } from "next/dist/server/router";


// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     if (!(session && session.token)) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: { session }
//     }
// }

export default function GameCode() {
    const router = useRouter();
    // const classes = useStyles();

    const { data: session, status } = useSession();
    const [context, dispatchContext] = useRContext();

    useEffect(() => {
        if (context.channel) {
            context.channel.bind('join-channel', data => {
                console.log("UE -> Join Channel: ", data);
                if ('player_name' in data) {
                    let players = context.joined_players;

                    if (data.player_name !== undefined)
                        players.push(data.player_name);

                    if (players.length === context.total_players) {
                        console.log("All players joined");
                        dispatchContext({
                            type: "update",
                            payload: { show_bar: true, joined_players: players }
                        });
                        router.push('/game/team');
                    }
                    else {
                        dispatchContext({
                            type: "update",
                            payload: { joined_players: players }
                        });
                    }
                }
            });
            // context.channel.bind('role_selected', data => {
            //     console.log("UE -> Role selected: ", data);
            //     dispatchContext({
            //         type: "update",
            //         payload: { player_joined: context.player_joined + 1 }
            //     });
            // });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.channel]);

    

    return (
        <Dialog open={true} BackdropProps={{ style: { background: `url(${bg.src})` } }} PaperProps={{ style: { width: "73.0rem", borderRadius: "4.0rem" } }}>
            <DialogTitle variant="h2" sx={{ background: "#f2f2f2", textAlign: "center" }}>
                Game Code
            </DialogTitle>
            <DialogContent sx={{ padding: "32px 50px !important", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {context.joined_players.length > 0 &&
                    <>
                        <PinInput max={6} size={12} value={context.game_code ? context.game_code : ""} onChange={() => { return null; }} disabled={true} />
                        <LobyCircularProgress total={context.total_players} join={context.joined_players.length} />
                    </>
                }
                {context.joined_players.length === 1 &&
                    <Typography variant="h4" sx={{ textAlign: "center", marginTop: "1.0rem", marginBottom: "1.0rem" }}>
                        Share the game code with your friends so <br /> they can join this game!
                    </Typography>
                }
                {context.joined_players.length > 1 &&
                    <Box spacing={1} sx={{ textAlign: "center" }}>
                        {context.joined_players.map((player, index) => (
                            <Chip key={index} label={player} sx={{ margin: "1.0rem 1.0rem", background: "#f2f2f2", borderRadius: "5px", fontSize: "1.6rem", height: "3.6rem", lineHeight: "3.6rem" }} size="medium" />
                        ))}
                    </Box>
                }
            </DialogContent>
        </Dialog>
    )
}

function LobyCircularProgress(props) {
    return (
        <Box sx={{ position: 'relative', display: "flex", alignItems: "center", justifyContent: "center", width: "auto", margin: "5.0rem" }}>
            <CircularProgress color="primary" variant="determinate" size={180} thickness={4} value={100} sx={{ opacity: 0.3 }} />
            <CircularProgress color="primary" variant="determinate" size={180} thickness={4} value={(100 / props.total) * props.join} sx={{ position: 'absolute', left: 0, "& circle": { strokeLinecap: 'round' } }} />
            <Box sx={{ position: "absolute" }}>
                <Typography color="primary" variant="h1" sx={{ textAlign: "center" }} >{props.join + "/" + props.total}</Typography>
                <Typography color="secondary" variant="body1" sx={{ textAlign: "center" }}>Players Joined</Typography>
            </Box>
        </Box>
    );
}


// const useStyles = makeStyles((theme) => ({
//     wrapperOne: {
//         display: 'flex',
//         minHeight: '100vh',
//         flexDirection: 'column',
//         backgroundSize: 'cover',
//         backgroundImage: `url(${bg.src})`,
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: 'top center',
//     },
//     avatar: {
//         width: "72px",
//         height: "72px",
//         border: "1px solid #fff",
//         boxShadow: "0px 0px 6px rgba(0,0,0,0.6)",
//         borderRadius: 5
//     },
// }));
