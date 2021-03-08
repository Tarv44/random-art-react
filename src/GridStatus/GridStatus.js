import GridContext from '../GridContext'
import { Component } from 'react'
import './GridStatus.css'

export default class GridStatus extends Component {
    static contextType = GridContext;
    render() {
        const gridId = this.props.match.params.gridId
        const cellsFilled = this.context[gridId].totalCellsFilled
        const totalCells = this.context[gridId].totalCells
        const fillPerc = Math.floor((cellsFilled/totalCells) * 100)
        return (
            <div className='grid-status'>
                <h3>{`${fillPerc}% of cells filled.`}</h3>
            </div>
        )
    }
}
