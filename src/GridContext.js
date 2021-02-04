import React from 'react';

const GridContext = React.createContext({
    small: {},
    medium: {},
    large: {},
    extraLarge: {},
    formStart: () => {},
    formStop: () => {},
    updateColorChances: () => {},
    updateSkewConstraints: () => {},
    updateNodeConstraints: () => {},
    updateTimeSizeConstraints: () => {},
    updateGridRows: () => {},
    updateGridCols: () => {}
})

export default GridContext;