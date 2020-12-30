import React from 'react';

const GridContext = React.createContext({
    small: {},
    medium: {},
    large: {},
    extraLarge: {},
    formSubmit: () => {}
})

export default GridContext;