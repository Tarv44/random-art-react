import React, {Component} from 'react';
import GridContext from '../GridContext';
import Column from '../Column/Column'
import './Grid.css'

class Grid extends Component {
    static contextType = GridContext;

    render() {
        const gridId = this.props.match.params.gridId
        const columns = this.context[gridId].grid.columns.map((column, i) => {
            return <Column columnData={column} key={i}/>
        })
        return (
            <div className="grid">
                {columns}
            </div>
        )
    }
}

export default Grid;