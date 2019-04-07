import { DefaultTheme } from 'react-native-paper';

const white = 'white';
const black = 'black';

const amber = '#ffc107';
const amberDark = '#c79100';

const Header = {
    HEADER_BG: amber,
    HEADER_LINE: amberDark
};

const appTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: amber,
        accent: white,
    },
};


module.exports = {
    appTheme,
    ...Header
};
