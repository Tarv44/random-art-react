import React, {Component} from 'react';
import {randomRGB} from './colorFunctions';

function randomFromRange(range) {
    return Math.floor(Math.random() * range)
}

function selectRandomCell(totalColumns, totalRows) {
    const column = randomFromRange(totalColumns);
    const row = randomFromRange(totalRows);
    return {column, row}
}

function surroundingCoors(currentGrid, cellCoor) {
    const columns = [cellCoor.column-1, cellCoor.column, cellCoor.column+1]
        .filter(num => num > -1 && num < currentGrid.totalColumns)
    const rows = [cellCoor.row-1, cellCoor.row, cellCoor.row+1]
        .filter(num => num > -1 && num < currentGrid.totalRows)
    const coors = [];
    for (let c = 0; c < columns.length; c++) {
        for (let r = 0; r < rows.length; r++) {
            const coor = {column: columns[c], row: rows[r]}
            if (!(cellCoor.column === coor.column && cellCoor.row === coor.row)) {
                coors.push(coor)
            }

        }
    }
    return coors
}

function getSurroundingColors(currentGrid, cellCoor) {
    const coors = surroundingCoors(currentGrid, cellCoor);
    const surrColors = [];
    for (let i = 0; i < coors.length; i++) {
        const cellColor = currentGrid.grid.columns[coors[i].column][coors[i].row].color
        if (cellColor !== null) {
            surrColors.push(cellColor)
        }
    }
    return surrColors
}

function skewColor(color) {
    console.log('skew color ran.')
    console.log('Original Color:', color)
    let red 
    let green
    let blue
    const redChange = (Math.floor(Math.random() * 10) + 1)
    const greenChange = (Math.floor(Math.random() * 10) + 1)
    const blueChange = (Math.floor(Math.random() * 10) + 1)

    if (Math.random() < .5) {
        red = color.red + redChange
        if (red > 255) {
            red = 255
        }
    } else {
        red = color.red - redChange
        if (red < 0) {
            red = 0
        }
    }

    if (Math.random() < .5) {
        green = color.green + greenChange
        if (green > 255) {
            green = 255
        }
    } else {
        green = color.green - greenChange
        if (green < 0) {
            green = 0
        }
    }

    if (Math.random() < .5) {
        blue = color.blue + blueChange
        if (blue > 255) {
            blue = 255
        }
    } else {
        blue = color.blue - blueChange
        if (blue < 0) {
            blue = 0
        }
    }

    const rgb = `rgba(${red}, ${green}, ${blue}, 1)`

    const newColor = {red, green, blue, rgb}

    console.log('New Color:', newColor)
    return newColor
}

function selectNewColor(surrColors) {
    const probability = (Math.random()*100)
    const colorIndex = (Math.floor(surrColors.length * Math.random()))
    const colorSelect = surrColors[colorIndex]
    let newColor
    if (probability <= 80) {
        newColor = colorSelect
    } else if (probability <= 99) {
        newColor = skewColor(colorSelect)
    } else {
        newColor = randomRGB()
    }
    return newColor
}

export function fillInitCells(state, gridId) {
    const currentGrid = state[gridId]
    const cellCoor = selectRandomCell(currentGrid.totalColumns, currentGrid.totalRows);
    currentGrid.grid.columns[cellCoor.column][cellCoor.row].color = randomRGB();
    currentGrid.grid.columns[cellCoor.column][cellCoor.row].opacity = 1;
    const newState = state;
    newState[gridId] = currentGrid;
    return newState;
}

export function fillColor(state, gridId) {
    const currentGrid = state[gridId]

    let unSelected = true;
    while(unSelected) {
        const cellCoor = selectRandomCell(currentGrid.totalColumns, currentGrid.totalRows);
        const cell = currentGrid.grid.columns[cellCoor.column][cellCoor.row]
        if (cell.color === null) {
            const surrColors = getSurroundingColors(currentGrid, cellCoor);
            if (surrColors.length > 0) {
                const newColor = selectNewColor(surrColors)
                currentGrid.grid.columns[cellCoor.column][cellCoor.row].color = newColor;
                currentGrid.grid.columns[cellCoor.column][cellCoor.row].opacity = 1;
                unSelected = false
            }
        } 
    }

    const newState = state;
    newState[gridId] = currentGrid
    return newState
}