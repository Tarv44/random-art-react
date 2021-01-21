import React, {Component} from 'react';
import GridContext from '../GridContext';
import Column from '../Column/Column';
import './Grid.css'

class Grid extends Component {
    static contextType = GridContext;

    render() {
        const gridId = this.props.match.params.gridId
        const cellsFilled = this.context[gridId].totalCellsFilled
        console.log(cellsFilled)
        const totalCells = this.context[gridId].totalCells
        const columns = this.context[gridId].grid !== null 
            ? this.context[gridId].grid.columns.map((column, i) => {
                return <Column columnData={column} key={i}/>
            })
            : null

        return (
            <div className="grid">
                {columns 
                    ? columns 
                    : ``}
            </div>
        )
    }
}

export default Grid;