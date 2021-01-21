import GridContext from '../GridContext'
import { Component } from 'react'

export default class GridStatus extends Component {
    static contextType = GridContext;
    render() {
        const gridId = this.props.match.params.gridId
        const cellsFilled = this.context[gridId].totalCellsFilled
        console.log(`Cells filled: ${cellsFilled}`)
        const totalCells = this.context[gridId].totalCells
        return (
            <div className='grid-status'>
                <h3>{`${cellsFilled} of ${totalCells} cells filled.`}</h3>
            </div>
        )
    }
}
