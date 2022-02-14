import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import Image from "next/image";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Button, Avatar, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { useSession } from 'next-auth/react';
import { useRContext } from "../../hooks/useRContext";
import axios from "axios";

// Icons
import GroupIcon from "./icons/GroupIcon";

// Resources
import avatar from '../../public/images/avatar.png';
import group_photo from '../../public/images/group.png';

const series = ['1st', '2nd', '3rd', '4th', '5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th'];

const TeamSelection = ({ isLeader, leader, totalMember, members }) => {
	const classes = useStyles();
	const { data: session, status } = useSession();
	const [context, dispatchContext] = useRContext();

	const leadersPhoto = useMemo(() => {
		console.log("Leader photo: ", leader.player_photo_url);
		return leader?.player_photo_url ? leader.player_photo_url : avatar.src;
	}, [leader]);

	const teamMembers = useMemo(() => {
		return members ? members : [];
	}, [members]);

	const handleConfirmTeam = () => {
		console.log("Confirm team");
		axios(context.game_api + '/confirm-team', {
			method: "POST",
			mode: "cors",
			headers: {
				'Authorization': `Bearer ${session.token}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			data: {
				"_id": context?.game_config?._id,
				"game_code": context?.game_config?.game_code,
				"members": members
			}
		}).then((response) => {
			console.log("S -> Confirm Team: ", response)
		}).catch(function (error) {
			console.log("E -> Confirm Team: ", error);
		});
	}

	useEffect(() => {
		console.log("Team Selection Loaded!");
		console.log(isLeader, leader, members);
	}, [])

	return useMemo(() => (
		<Box className={classes.team}>
			<Typography variant="h2" sx={{ paddingBottom: "48px" }}>Team Leader</Typography>
			<img className={classes.leader} width={204} height={204} alt="" src={leadersPhoto} />
			{isLeader
				? <List className={classes.member}>
					<ListItem>
						<GroupIcon />
						<Typography variant="h5">&nbsp;&nbsp;Team Members</Typography>
					</ListItem>
					{teamMembers.length === 0 &&
						<ListItem>
							<Typography variant="h5">Select 4 Team Members by clicking directly on their video feed!</Typography>
						</ListItem>
					}
					{teamMembers.length > 0 && teamMembers?.map((mItem, mIndex) => (
						<ListItem key={mIndex}>
							<ListItemAvatar>
								<Avatar src={mItem.player_photo_url} sx={{ border: "2px dashed #fff" }}>&nbsp;</Avatar>
							</ListItemAvatar>
							<Typography variant="h3">{mItem.player_name}</Typography>
						</ListItem>
					))}
					{teamMembers.length > 0 && [...Array(totalMember-members.length)].map((item, index) =>
						<ListItem key={members.length+index}>
							<ListItemAvatar>
								<Avatar sx={{ border: "2px dashed #fff" }}>&nbsp;</Avatar>
							</ListItemAvatar>
							<Typography variant="h3">Select {series[members.length+index]} person</Typography>
						</ListItem>
					)}
				</List>
				: <Box sx={{ padding: "48px 0", flex: 1 }}>
					<Typography variant="h4">Team Selection in Progress</Typography>
					<Box sx={{ maxWidth: "260px", height: "auto", }}>
					</Box>
					<Image src={group_photo.src} width={260} height={260}
						layout='responsive' blurDataURL="blur" alt="" />
				</Box>
			}
			{isLeader && totalMember === members.length &&
				<Button color="warning" onClick={handleConfirmTeam} variant="contained" sx={{ width: "100%" }}>Confirm Team</Button>
			}
		</Box>
	), [classes, isLeader, leadersPhoto, members]);
};

TeamSelection.propTypes = {
	isLeader: PropTypes.bool,
	isLocal: PropTypes.bool,
	leader: PropTypes.object,
	totalMember: PropTypes.number,
	members: PropTypes.array
}

const useStyles = makeStyles(() => ({
	member: {
		display: "flex",
		width: "100%",
		background: "rgba(0,0,0,0.12)",
		borderRadius: "20px",
		textAlign: "center",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "flex-start",
		margin: "48px 0",
		'& h5': {
			fontSize: 18,
			color: "#ffffff !important",
			textAlign: "left !important",
			opacity: "60%"
		},
		'& h3': {
			fontSize: 24,
			width: "100%",
			color: "#ffffff !important",
			textAlign: "left !important"
		}
	},
	team: {
		flex: 1,
		display: "flex",
		padding: "3.2rem",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-around",
		'& h2, h4': {
			color: "#fff !important"
		}
	},
	leader: {
		width: "204px",
		height: "204px",
		borderRadius: "36px",
		border: "4px solid #ffffff",
		marginBottom: "72px"
	},
	group: {
		width: "100%",
		maxWidth: "240px",
		border: "none",
		marginTop: "72px !important",
	},
}));

export default TeamSelection;
