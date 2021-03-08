import generateEmptyGrid from './generateEmptyGrid';
import { randomFromRange, randomFromArray } from './helperFunctions';

function selectRandomCell(totalColumns, totalRows) {
    const column = randomFromRange(totalColumns);
    const row = randomFromRange(totalRows);
    return {column, row}
}

//Generates random rgb value based on color range constraints
export function rangedRandomRGB(gridConst) {
    const colorRanges = gridConst.skew
    const colorObject = {}
    colorObject.red = (randomFromRange(colorRanges.redUpper - colorRanges.redLow + 1) + colorRanges.redLow)
    colorObject.green = (randomFromRange(colorRanges.greenUpper - colorRanges.greenLow + 1) + colorRanges.greenLow)
    colorObject.blue = (randomFromRange(colorRanges.blueUpper - colorRanges.blueLow + 1) + colorRanges.blueLow)
    const rgb = `rgba(${colorObject.red}, ${colorObject.green}, ${colorObject.blue}, 1)`
    colorObject.rgb = rgb
    return colorObject
}

//Given a single cell's coordinates, 
//retrieves coordinates of all surrounding cells within the grid
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

//Filters all surrounding cells coordinates so that only cells
//with no color are returned.
function getSurrEmpties(gridCols, cellCoor) {
    const surrCoors = allSurrCoors(gridCols, cellCoor)
    const surrEmpties = surrCoors.filter(coor => 
        gridCols[coor.column][coor.row].color === null)
    return surrEmpties
}

//Filters all surrounding cells coordinates so that only cells
//with colors are returned.
function getSurrColors(gridCols, cellCoor) {
    const coors = allSurrCoors(gridCols, cellCoor);
    const surrColors = coors.filter(coor =>
        gridCols[coor.column][coor.row].color !== null)
    return surrColors
}

//Updates fillable cells array with new fillable cells and removes
//cell that is currently being filled
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

//Given values for r, g, and b, select new random values that
//are within the given skew range.
//I.e. red = 110, skew = +- 10, new red returned = 117. 
function skewColor(color, currentGridConstraints) {
    const range = currentGridConstraints.skew.changeRange
    let red 
    let green
    let blue
    const redChange = (randomFromRange(range) + 1)
    const greenChange = (randomFromRange(range) + 1)
    const blueChange = (randomFromRange(range) + 1)

    if (Math.random() < .5) {
        red = color.red + redChange
        if (red > currentGridConstraints.skew.redUpper) {
            red = currentGridConstraints.skew.redUpper
        }
    } else {
        red = color.red - redChange
        if (red < currentGridConstraints.skew.redLow) {
            red = currentGridConstraints.skew.redLow
        }
    }

    if (Math.random() < .5) {
        green = color.green + greenChange
        if (green > currentGridConstraints.skew.greenUpper) {
            green = currentGridConstraints.skew.greenUpper
        }
    } else {
        green = color.green - greenChange
        if (green < currentGridConstraints.skew.greenLow) {
            green = currentGridConstraints.skew.greenLow
        }
    }

    if (Math.random() < .5) {
        blue = color.blue + blueChange
        if (blue > currentGridConstraints.skew.blueUpper) {
            blue = currentGridConstraints.skew.blueUpper
        }
    } else {
        blue = color.blue - blueChange
        if (blue < currentGridConstraints.skew.blueLow) {
            blue = currentGridConstraints.skew.blueLow
        }
    }

    const rgb = `rgba(${red}, ${green}, ${blue}, 1)`

    const newColor = {red, green, blue, rgb}
    return newColor
}

//Randomly select (given the predetermined probabilities) 
//whether the cell currently being filled will receive:
//A. The same exact color as a surrounding cell
//B. A skewed color based off the color of a surrounding cell
//C. A completely random color
function selectNewColor(surrColor, currentGridConstraints) {
    const probability = (Math.random()*100)
    const colorChances = currentGridConstraints.colorChances
    let newColor
    if (probability <= parseFloat(colorChances.same)) {
        newColor = surrColor
    } else if (probability <= parseFloat(colorChances.same) + parseFloat(colorChances.skew)) {
        newColor = skewColor(surrColor, currentGridConstraints)
    } else {
        newColor = rangedRandomRGB(currentGridConstraints)
    }
    return newColor
}


//Fill initial starting nodes of grid, given the predetermined
//amount of starting nodes.
function fillInitCells(currentGrid) {
    const totalStartNodes = currentGrid.formConstraints.node.totalStart
    for (let i = 1; i <= totalStartNodes; i++) {
        const cellCoor = selectRandomCell(currentGrid.totalColumns, currentGrid.totalRows);
        currentGrid.grid.columns[cellCoor.column][cellCoor.row].color = rangedRandomRGB(currentGrid.formConstraints);
        currentGrid.grid.columns[cellCoor.column][cellCoor.row].opacity = 1;
        currentGrid.totalCellsFilled += 1
        currentGrid.fillableCells = currentGrid.fillableCells.concat(getSurrEmpties(currentGrid.grid.columns, cellCoor))
    }
    return currentGrid
}

//If grid is generated or is completely full, generate new grid 
//and fill initial cells. Otherwise, simply hide form for restart.
export function fillStart(currentGrid, gridId) {
    if (currentGrid.totalCellsFilled === currentGrid.totalCells || currentGrid.grid === null) {
        currentGrid.grid = generateEmptyGrid(currentGrid, gridId)
        currentGrid.totalCellsFilled = 0
    }

    if (currentGrid.totalCellsFilled === 0) {
        currentGrid = fillInitCells(currentGrid)
    }

    currentGrid.showForm = false
    return currentGrid
}

//Go through process of selecting a random fillable cell
//and selecting a color for it.
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
    currentGrid.fillableCells = fillableCells

    return currentGrid
}

//Fill grid until the designated portion of grid to be filled
//is reached, or until grid is full, whichever comes first.
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