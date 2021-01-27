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
        const fillingStatus = this.context[gridId].filling ? 'Filling...' : 'Filling stopped.'
        const fillStatClass = this.context[gridId].filling ? 'filling' : 'not-filling'
        return (
            <div className='grid-status'>
                <h3>{`${fillPerc}% of cells filled.`}</h3>
                <h4 className={fillStatClass}>{fillingStatus}</h4>
            </div>
        )
    }
}
