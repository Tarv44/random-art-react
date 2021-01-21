import React, {Component} from 'react';
import {randomRGB} from './colorFunctions';
import generateEmptyGrid from './generateEmptyGrid';

function randomFromRange(range) {
    return Math.floor(Math.random() * range)
}

function randomFromArray(array) {
    const i = randomFromRange(array.length)
    return array[i]
}

function selectRandomCell(totalColumns, totalRows) {
    const column = randomFromRange(totalColumns);
    const row = randomFromRange(totalRows);
    return {column, row}
}

function selectFillCenter(currentGrid) {
    const index = randomFromRange(currentGrid.fillCenters.length)
    const coors = currentGrid.fillCenters[index]
    return {coors, index}
    
}

function allSurrCoors(gridCols, cellCoor) {
    const columns = [cellCoor.column-1, cellCoor.column, cellCoor.column+1]
        .filter(num => num > -1 && num < gridCols.length)
    const rows = [cellCoor.row-1, cellCoor.row, cellCoor.row+1]
        .filter(num => num > -1 && num < gridCols[0].length)
    const coors = [];
    for (let c = 0; c < columns.length; c++) {
        for (let r = 0; r < rows.length; r++) {
            const id = `c${columns[c]}r${rows[r]}`
            const coor = {column: columns[c], row: rows[r], id}
            if (!(cellCoor.column === coor.column && cellCoor.row === coor.row)) {
                coors.push(coor)
            }

        }
    }
    return coors
}

function getSurrEmpties(gridCols, cellCoor) {
    const surrCoors = allSurrCoors(gridCols, cellCoor)
    const surrEmpties = surrCoors.filter(coor => 
        gridCols[coor.column][coor.row].color === null)
    return surrEmpties
}

function getSurrColors(gridCols, cellCoor) {
    const coors = allSurrCoors(gridCols, cellCoor);
    const surrColors = coors.filter(coor =>
        gridCols[coor.column][coor.row].color !== null)
    return surrColors
}

function updateFillableCells(gridCols, fillableCells, currentCoor) {
    const newList = fillableCells.filter(cell => cell.id !== currentCoor.id)
    const allSurrEmpties = getSurrEmpties(gridCols, currentCoor)
    const newFillables = []
    for(let i = 0; i < allSurrEmpties.length; i++) {
        if(!fillableCells.some(cell => cell.id === allSurrEmpties[i].id)) {
            newFillables.push(allSurrEmpties[i])
        }
    }
    return newList.concat(newFillables)
}

function skewColor(color, currentGridConstraints) {
    const range = currentGridConstraints.skew.changeRange
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

function selectNewColor(surrColor, currentGridConstraints) {
    const probability = (Math.random()*100)
    const colorChances = currentGridConstraints.colorChances
    let newColor
    if (probability <= parseFloat(colorChances.same)) {
        newColor = surrColor
    } else if (probability <= parseFloat(colorChances.same) + parseFloat(colorChances.skew)) {
        newColor = skewColor(surrColor, currentGridConstraints)
    } else {
        newColor = randomRGB()
    }
    return newColor
}

function fillInitCells(currentGrid) {
    const totalStartNodes = currentGrid.formConstraints.node.totalStart
    for (let i = 1; i <= totalStartNodes; i++) {
        const cellCoor = selectRandomCell(currentGrid.totalColumns, currentGrid.totalRows);
        currentGrid.grid.columns[cellCoor.column][cellCoor.row].color = randomRGB();
        currentGrid.grid.columns[cellCoor.column][cellCoor.row].opacity = 1;
        currentGrid.totalCellsFilled += 1
        currentGrid.fillCenters.push(cellCoor)
        currentGrid.fillableCells = currentGrid.fillableCells.concat(getSurrEmpties(currentGrid.grid.columns, cellCoor))
    }
    return currentGrid
}

export function fillStart(currentGrid, gridId) {
    if (currentGrid.totalCellsFilled === currentGrid.totalCells || currentGrid.grid === null) {
        currentGrid.grid = generateEmptyGrid(currentGrid, gridId)
        currentGrid.totalCellsFilled = 0
    }

    if (currentGrid.totalCellsFilled === 0) {
        currentGrid = fillInitCells(currentGrid)
    }

    currentGrid.filling = true
    return currentGrid
}

function fillColor(currentGrid) {
    const gridCols = currentGrid.grid.columns
    const fillableCoor = randomFromArray(currentGrid.fillableCells)
    

    const fillableCells = updateFillableCells(gridCols, currentGrid.fillableCells, fillableCoor)

    const surrColorsCoors = getSurrColors(gridCols, fillableCoor)
    const baseColorCoor = randomFromArray(surrColorsCoors)
    const baseColor = currentGrid.grid.columns[baseColorCoor.column][baseColorCoor.row].color
    const newColor = selectNewColor(baseColor, currentGrid.formConstraints)
    currentGrid.grid.columns[fillableCoor.column][fillableCoor.row].color = newColor;
    currentGrid.grid.columns[fillableCoor.column][fillableCoor.row].opacity = 1;
    currentGrid.totalCellsFilled += 1;
    // currentGrid.fillCenters = fillCenters
    currentGrid.fillableCells = fillableCells

    return currentGrid
}

export function fillCellGroup(currentGrid) {
    const groupSizePerc = currentGrid.formConstraints.timeSize.fillGroupSize / 100
    const groupSize = Math.floor(currentGrid.totalCells * groupSizePerc)
    const cellsLeft = currentGrid.totalCells - currentGrid.totalCellsFilled
    let newGrid = currentGrid
    if (cellsLeft > groupSize) {
        for (let i = 0; i < groupSize; i++) {
            newGrid = fillColor(newGrid)
        }
    } else {
        for (let i = 0; i < cellsLeft; i++) {
            newGrid = fillColor(newGrid)
        }
    }
    return newGrid
}