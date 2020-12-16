import {randomRGB} from './colorFunctions';

function generateEmptyCell(col, r, gridSize) {
    const cellId = `c${col}r${r}`
    const emptyCell = {
        id: cellId,
        column: col,
        row: r,
        gridSize: gridSize,
        color: randomRGB()
    }
    return emptyCell
}

export default function generateEmptyGrid(state, gridSize) {
    const gridState = {}
    const gridArray = []
    for (let i = 0; i < state.totalColumns; i++) {
        const columnArray = []
        for (let p = 0; p < state.totalRows; p++) {
            columnArray.push(generateEmptyCell(i, p, gridSize))
        }
        gridArray.push(columnArray)
    }
    gridState.columns = gridArray
    return gridState
}