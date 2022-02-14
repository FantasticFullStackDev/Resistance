import { AvatarGroup, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';

export default function PinInput(props) {
    const classes = useStyles();
    const [pin, setPin] = useState({
        disabled: props.disabled || false,
        values: Number.isInteger(props.max)
            ? props.value.length === props.max 
                ? props.value.split('')
                : new Array(props.max).fill("")
            : new Array(4).fill(""),
        size: props.size || 4,
    });

    function handleKeyUp(event, value) {
        // event.key = event.key.toUpperCase();
        if (event.key === "Backspace" || event.key === "Delete" || event.key === "ArrowLeft") {
            if (event.key === "ArrowLeft") {
                const next = event.target.tabIndex - 2;
                if (next > -1) { event.target.form.elements[next].focus(); }
            }
            else {
                let vals = pin.values;
                vals[value] = "";
                setPin({...pin, values: vals});
            }
        }
        else if (/^[A-Z]$/i.test(event.key) || event.key === "ArrowRight") {
            if (event.key !== "ArrowRight"){
                let vals = pin.values;
                vals[value] = event.key.toUpperCase();
                setPin({...pin,values: vals});
            } 
            const next = event.target.tabIndex;
            if (next < 6) { event.target.form.elements[next].focus(); }
        }
    }

    useEffect(() => {
        props.onChange(pin.values.join(''));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pin]);

    return (
        <AvatarGroup spacing={1} max={6} className={classes.avatar}>
            <form>
                {pin.values && pin.values.map((value, index) => (
                    <Input
                        key={index}
                        value={value}
                        sx={{height:props.size+"px",width:props.size+"px"}}
                        inputProps={{ maxLength: 1, tabIndex: index+1, disabled: pin.disabled }}
                        className={classes.input + (props.status ? " " + props.status : "")}
                        onKeyUp={e => handleKeyUp(e, index)}
                    />
                ))}
            </form>
        </AvatarGroup>
    );
}

const useStyles = makeStyles(theme => ({
    avatar: {
        borderRadius: "999px",
        border: "2px dashed #DEDFE3",
        padding: "6px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    input: {
        width: "36px",
        height: "36px",
        outline: "none",
        background: "#F2F2F2",
        margin: "3px",
        textAlign: "center !important",
        alignItems: "center !important",
        '&:before': {
            display: "none"
        },
        '& input': {
            textAlign: "center !important",
            textTransform: "uppercase",
        },
        '&.error': {
            border: "2px solid red",
            color: "red"
        },
        '&.success': {
            border: "2px solid green",
            color: "green"
        }
    },
}));