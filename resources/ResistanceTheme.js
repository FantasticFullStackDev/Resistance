import { createTheme } from '@mui/material';

const custom_theme = createTheme({
    palette: {
        primary: {
            main: '#4E3EC8',
        },
        secondary: {
            main: '#56CCF2',
        },
        tertiary: {
            main: '#FF5441',
        },
        success: {
            main: '#07A603'
        }
    },
    typography: {
        fontSize: 14,
        htmlFontSize: 16,
        fontWeightBold: 700,
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightRegular: 400,
        fontWeightExtraBold: 800,
        fontFamily: "'Nunito Sans', sans-serif",
        fontFamilyCode: "Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace",
        fontFamilyTagline: "'PlusJakartaSans-ExtraBold',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
        fontFamilySystem: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
        h1: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '4.8rem',
            lineHeight: '5.8rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        h2: {
            fontWeight: 700,
            color: "#262A41 !important",
            fontSize: '3.0rem',
            lineHeight: '5.0rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        h3: {
            fontWeight: 600,
            color: "#262A41 !important",
            fontSize: '2.4rem',
            lineHeight: '3.6rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        h4: {
            fontWeight: 600,
            color: "#262A41 !important",
            fontSize: '2.0rem',
            lineHeight: '3.0rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        h5: {
            fontWeight: 400,
            letterSpacing: 0,
            color: "#5C5F70 !important",
            fontSize: '1.8rem',
            lineHeight: '2.4rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        h6: {
            fontWeight: 400,
            color: "#262A41 !important",
            fontSize: '1.6rem',
            lineHeight: '2.2rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },

        body1: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '1.4rem',
            lineHeight: '2.4rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        body2: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '1.2rem',
            lineHeight: '2.2rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        caption: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '1.2rem',
            lineHeight: '2.2rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },

        subtitle2: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '1.2rem',
            lineHeight: '2.2rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        overline: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '1.2rem',
            lineHeight: '2.2rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        button: {
            fontWeight: 600,
            color: "#262A41 !important",
            fontSize: '1.4rem',
            lineHeight: '2.4rem',
            fontFamily: "'Nunito Sans', sans-serif",
        },
        subtitle1: {
            fontWeight: 800,
            color: "#262A41 !important",
            fontSize: '1.2rem',
            lineHeight: '2.2rem',
            fontFamily: "'Nunito Sans', sans-serif",
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                sizeLarge: {
                    padding: "1.7rem 3.4rem",
                    fontSize: "2.0rem",
                    lineHeight: "3.0rem",
                    fontWeight: 700,
                    textTransform: "Capitalize",
                    wordWrap: "no-wrap",
                },
                sizeNormal: {
                    padding: "1.0rem 2.0rem",
                    fontSize: "1.8rem",
                    lineHeight: "2.8rem",
                    fontWeight: 700,
                    textTransform: "Capitalize",
                },
                sizeMedium: {
                    padding: "1.3rem 5.6rem",
                    fontSize: "2.0rem",
                    lineHeight: "3.0rem",
                    fontWeight: 700,
                    textTransform: "Capitalize",
                },
                sizeSmall: {
                    padding: "1.2rem 2.4rem",
                    fontSize: "1.6rem",
                    lineHeight: "2.4rem",
                    fontWeight: 700,
                    textTransform: "Capitalize",
                },

            },
            variants: [
                {
                    props: {
                        variant: "code"
                    },
                    style: {
                        color: "#BFC7CF",
                        border: "1px solid",
                        borderColor: "#265D97",
                        backgroundColor: "#132F4C",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                        letterSpacing: 0,
                        fontFamily: "Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace",
                        fontWeight: 600,
                        WebkitFontSmoothing: "subpixel-antialiased",
                        "&:hover, &.Mui-focusVisible": {
                            borderColor: "#3399FF",
                            backgroundColor: "#173A5E",
                            "& .MuiButton-endIcon": {
                                color: "#66B2FF"
                            }
                        },
                        "& .MuiButton-startIcon": {
                            color: "#BFC7CF"
                        },
                        "& .MuiButton-endIcon": {
                            color: "#BFC7CF"
                        }
                    }
                }
            ]
        }
    }
});

export default custom_theme;