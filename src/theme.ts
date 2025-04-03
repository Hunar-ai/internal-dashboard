import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import {
    type PaletteColor,
    type PaletteColorOptions
} from '@mui/material/styles/createPalette';

interface ChatBotTheme {
    bgColor: {
        question: string;
        answer: string;
    };
    color: {
        questionInput: string;
        answer: string;
    };
}

declare module '@mui/material/styles' {
    interface Palette {
        chatBot: ChatBotTheme;
    }
    interface PaletteOptions {
        chatBot: ChatBotTheme;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        violet: PaletteColor;
    }
    interface PaletteOptions {
        violet?: PaletteColorOptions;
    }
}

export const asteriskStyle = {
    color: red[600],
    fontSize: '20px',
    fontFamily: 'Roboto,Arial,sans-serif'
};

export const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'Lato, Arial',
            textTransform: 'none'
        }
    },
    palette: {
        chatBot: {
            bgColor: {
                question: 'rgb(104,134,255,.2)',
                answer: '#fbfbfb'
            },
            color: {
                questionInput: '#3445a2',
                answer: '#bdbdbd'
            }
        },
        text: {
            primary: grey[900]
        },
        violet: {
            main: '#7367EF',
            light: '#857BEF',
            dark: '#6258D0',
            contrastText: '#fff'
        }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiButton: {
            styleOverrides: {
                sizeMedium: {
                    height: '2.0.85rem'
                },
                sizeSmall: {
                    height: '1.8rem'
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    // fontSize: '0.85rem',
                    // minHeight: '1.138rem'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                asterisk: asteriskStyle
            }
        },
        MuiTableRow: {
            styleOverrides: {
                // Even though there is a hover rule we have to override it here. Don't ask.
                root: {
                    '&:hover': {
                        backgroundColor: grey[100],
                        '.left-sticky-cell, .right-sticky-cell': {
                            backgroundColor: grey[100]
                        }
                    },
                    '.left-sticky-cell, .right-sticky-cell': {
                        backgroundColor: 'white'
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                // Even though there is a hover rule we have to override it here. Don't ask.
                head: {
                    backgroundColor: grey[100]
                }
            }
        }
    }
});
