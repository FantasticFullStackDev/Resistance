import React, { useMemo } from 'react';
import PropTypes from "prop-types";

import Image from "next/image";
import {Box} from "@mui/system";
import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";

// Resources
import spy from "../../public/images/spy.png";
import resistance from "../../public/images/resistance.png";

const RoleView = ({role}) => {
	const classes= useStyles()

	return useMemo(
		() => (
			<>
				<Box className={classes.image}>
					<Image src={role === 'Spy'? spy : resistance} alt="min"/>
				</Box>
				<Box container className={classes.members} >
					<Typography variant="h3">{role === 'Spy' ? 'Recognize Fellow Spies!' : 'Starting Soon!'}</Typography>
					<Typography variant="h5">{role === 'Spy' ? 'Spies have a red badge on their video feed' : 'Team Leader will be randomly assigned and the missions begin!'}</Typography>
				</Box>
			</>
		),
		[role,classes]
	);
};

RoleView.propTypes = {
	role:PropTypes.string
}

const useStyles = makeStyles(() => ({
	image: {
		height: "auto",
		width: '100%',
		padding: "32px 0"
	},
	members: {
		display: "flex",
		width: "100%",
		padding: "32px",
		background: "rgba(0,0,0,0.12)",
		borderRadius: "20px",
		textAlign: "center",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "flex-start",
		'& h5': {
			fontSize: 18,
			color: "#ffffff !important",
			textAlign: "center !important",
			opacity: "60%"
		},
		'& h3': {
			fontSize: 24,
			width: "100%",
			color: "#ffffff !important",
			textAlign: "center !important"
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
			border: "4px solid #fff"
		},
		group: {
			width: "100%",
			maxWidth: "240px",
			border: "none"
		},
	}
}));

export default RoleView;
