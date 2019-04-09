import { DefaultTheme } from 'react-native-paper';

const white = 'white';
const black = 'black';

const amber = '#ffc107';
const amberDark = '#c79100';

const grey = '#e0e0e0';

const Screen = {
    BG: white
};

const Header = {
    HEADER_BG: amber,
    HEADER_LINE: amberDark
};

const Card = {
    CARD_BG: grey,
    DOT_COLOR: amberDark,
    SHOW_MORE_COLOR: amberDark
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
    ...Screen,
    ...Header,
    ...Card
};
