import React, {Component} from 'react';
import {randomRGB} from './colorFunctions';
import generateEmptyGrid from './generateEmptyGrid';

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

function skewColor(color, currentGridConstraints) {
    const range = currentGridConstraints.skewConstraints.changeRange
    let red 
    let green
    let blue
    const redChange = (Math.floor(Math.random() * range) + 1)
    const greenChange = (Math.floor(Math.random() * range) + 1)
    const blueChange = (Math.floor(Math.random() * range) + 1)

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
    return newColor
}

function selectNewColor(surrColors, currentGridConstraints) {
    const probability = (Math.random()*100)
    const colorIndex = (Math.floor(surrColors.length * Math.random()))
    const colorSelect = surrColors[colorIndex]
    const colorChances = currentGridConstraints.colorChances
    let newColor
    if (probability <= colorChances.same) {
        newColor = colorSelect
    } else if (probability <= colorChances.same + colorChances.skew) {
        newColor = skewColor(colorSelect, currentGridConstraints)
    } else {
        newColor = randomRGB()
    }
    return newColor
}

function fillInitCells(currentGrid) {
    const totalStartNodes = currentGrid.formConstraints.nodeConstraints.totalStart
    for (let i = 1; i <= totalStartNodes; i++) {
        const cellCoor = selectRandomCell(currentGrid.totalColumns, currentGrid.totalRows);
        currentGrid.grid.columns[cellCoor.column][cellCoor.row].color = randomRGB();
        currentGrid.grid.columns[cellCoor.column][cellCoor.row].opacity = 1;
        currentGrid.totalCellsFilled += 1
    }
}

export function fillStart(currentGrid, gridId) {
    if (currentGrid.totalCellsFilled === currentGrid.totalCells) {
        currentGrid.grid = generateEmptyGrid(currentGrid, gridId)
        currentGrid.totalCellsFilled = 0
    }
    
    if (currentGrid.totalCellsFilled === 0) {
        fillInitCells(currentGrid)
    }

    currentGrid.filling = true
    return currentGrid
}

export function fillColor(currentGrid) {
    let unSelected = true;
    while(unSelected) {
        const cellCoor = selectRandomCell(currentGrid.totalColumns, currentGrid.totalRows);
        const cell = currentGrid.grid.columns[cellCoor.column][cellCoor.row]
        if (cell.color === null) {
            const surrColors = getSurroundingColors(currentGrid, cellCoor);
            if (surrColors.length > 0) {
                const newColor = selectNewColor(surrColors, currentGrid.formConstraints)
                currentGrid.grid.columns[cellCoor.column][cellCoor.row].color = newColor;
                currentGrid.grid.columns[cellCoor.column][cellCoor.row].opacity = 1;
                currentGrid.totalCellsFilled += 1;
                unSelected = false
            }
        } 
    }

    return currentGrid
}