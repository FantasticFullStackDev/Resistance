import React, { useState, useRef, useEffect, useContext } from "react";

import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { IconButton, Typography } from "@mui/material";

import DoneIcon from '@mui/icons-material/Done';
import { EditIcon } from "../../resources/ResistanceIcons";

import axios from "axios";

import { useRContext } from "../../hooks/useRContext";
import { useSession, getSession } from 'next-auth/react';


export default function Profile() {
  const {
    data: session,
    status
  } = useSession();

  const classes = useStyles();
  const inputRef = useRef(null);

  const [edit, setEdit] = useState(false);
  const [context, dispatchContext] = useRContext();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileUrl,setProfileUrl] = useState(null);

  function handleEdit() {
    setEdit(!edit);
    inputRef.current.focus();
    console.log(inputRef.current);
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(inputRef.current);
    range.collapse(false);
    selection.addRange(range);
  }
  function handleSave() {
    setEdit(!edit);
    inputRef.current.focus();
    dispatchContext({
      type: "update",
      payload: {
        name: inputRef.current.value
      }
    });

    axios(context.user_api + '/setup_profile', {
      method: "PUT",
      mode: "cors",
      headers: {
        'Authorization': `Bearer ${session.token}`,
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        "name": inputRef.current.innerText
      }
    }).then((response) => {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const uploadProfilePicture = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        const img = new Image();
        img.onload = () => {
          const image_width = img.width;
          const image_height = img.height;

          const image_aspect_ratio = image_width / image_height;
          const canvas_aspect_ratio = 1 / 1;

          let canvas_width = image_width;
          let canvas_height = image_height;

          if (image_aspect_ratio > canvas_aspect_ratio) {
            canvas_width = image_height * canvas_aspect_ratio;
          }
          else if (image_aspect_ratio < canvas_aspect_ratio) {
            canvas_height = image_width / canvas_aspect_ratio;
          }

          let canvas_x = (canvas_width - image_width) * 0.5;
          let canvas_y = (canvas_height - image_height) * 0.5;

          // Create image size canvas
          let canvas = document.createElement('canvas');
          canvas.width = canvas_width;
          canvas.height = canvas_height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, canvas_x, canvas_y);

          let dataUrl = canvas.toDataURL(file.type);

          setProfilePicture({
            name: session.user.info._id,
            type: file.type,
            width: img.width,
            height: img.height,
            base64: dataUrl
          });
        }
        img.src = e.target.result;
      }
    }
  }

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  useEffect(() => {
    if (profilePicture) {
      axios(context.user_api + '/presign_url?file_name=' + profilePicture?.name+'.'+profilePicture.type.split('/')[1], {
        method: "GET",
        mode: "cors",
        headers: {
          'Authorization': `Bearer ${session?.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log("S -> Presigned Url: ", response);
        axios(response.data.url, {
          method: "PUT",
          headers: {
            'Content-Type': profilePicture.type,
            'x-amz-acl': 'public-read',
            'Content-Encoding': 'base64'
          },

          data: Buffer.from(profilePicture?.base64?.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        }).then((data) => {
          console.log("S -> Upload to Aws:", data);
          axios(context.user_api + '/setup_profile', {
            method: "PUT",
            mode: "cors",
            headers: {
              'Authorization': `Bearer ${session.token}`,
              'Content-Type': 'application/json'
            },
            data: {
              "profile_url": data.config.url.split('?')[0]
            }
          }).then((res) => {
            console.log("S -> Setup Profile:", res);
            setProfileUrl(data.config.url.split('?')[0]);
          }).catch(function (err) {
            console.log("E -> Setup Profile:", err);
          });
        }).catch(function (error) {
          console.log("E -> Upload to Aws:", response);
          console.log(error);
        });
      }).catch(function (error) {
        console.log("S -> Presigned Url: ", error);
      });
    }
  }, [profilePicture]);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <Box className={classes.profileBox}>
        <input type="file" id="imgupload" style={{ display: 'none' }} onChange={uploadProfilePicture} />
        <label style={{ display: "flex" }} htmlFor="imgupload">
          <img alt="avatar" className={classes.avatar} src={session?.user?.info?.profile_url ? session?.user?.info?.profile_url : profileUrl} variant="rounded" />
        </label>
        <Box className={classes.nameBox}>
          <Typography ref={inputRef} onBlur={handleSave} className={classes.name} variant="h3" contentEditable={edit} suppressContentEditableWarning={true} spellCheck={false}>{session?.user?.info?.name}</Typography>
          {edit ? (
            <IconButton color="primary" aria-label="Save" onClick={handleSave}>
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton color="primary" aria-label="Edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
        <Box className={classes.gameWin}>
          <Box className={classes.total}>
            <Typography variant="h6" color="textSecondary">Games Played</Typography>
            <Typography variant="h2" color="textSecondary">{session?.user?.info?.resistance_game?.games_played}</Typography>
          </Box>
          <Box className={classes.asResistance}>
            <Typography variant="h6" color="textSecondary">Resistance Wins</Typography>
            <Typography variant="h2" color="textSecondary">{session?.user?.info?.resistance_game?.wins_as_resistance}</Typography>
          </Box>
          <Box className={classes.asSpy}>
            <Typography variant="h6" color="textSecondary">Spy Wins</Typography>
            <Typography variant="h2" color="textSecondary">{session?.user?.info?.resistance_game?.wins_as_spy}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  profileBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "1.6rem",
  },
  avatar: {
    width: 125,
    height: 125,
    border: "4px solid #fff",
    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    borderRadius: '10px',
    background: "red"
  },
  nameBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

  },
  name: {
    border: "none",
    outline: "none",
    padding: "4px 8px",
    '&:focus': {
      borderBottom: "1px solid #dfdfdf",
    }
  },
  gameWin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 0,
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #dfdfdf",

  },
  total: {
    flex: 1,
    padding: "2.7rem",
    borderRight: "1px solid #dfdfdf",
  },
  asResistance: {
    flex: 1,
    padding: "2.7rem",
  },
  asSpy: {
    flex: 1,
    borderLeft: "1px solid #dfdfdf",
    padding: "2.7rem",
  }

}));




