import React, {Component} from 'react';
import Cell from '../Cell/Cell';
import GridContext from '../GridContext'
import './Column.css'

export default class Column extends Component {
    static contextType = GridContext;

    static defaultProps = {
        columnData: []
    }

    render() {
        const cells = this.props.columnData.map((cell, i) => {
            return <Cell cellData={cell} key={cell.id} />
        })
        return(
            <div className='column'>
                {cells}
            </div>
        )
    }
}