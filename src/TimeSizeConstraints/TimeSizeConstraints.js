import {Component} from 'react';
import GridContext from '../GridContext';
import './TimeSizeConstraints.css';

export default class TimeSizeConstraints extends Component {
    static contextType = GridContext
    render() {
        const currentGrid = this.context[this.props.gridId]
        return (
            <fieldset className='timeSize'>
                <legend>Time/Size Constraints</legend>
                <fieldset>
                    <legend>Group Fill Percentage</legend>
                    <label htmlFor='timeInterval'>Amount of grid filled at each interval (percent):</label>
                    <input 
                        type='text'
                        name='groupSize'
                        className='groupSize'
                        placeholder={currentGrid.formConstraints.timeSize.fillGroupSize}
                        onChange={e => this.context.updateTimeSizeConstraints(this.props.gridId, 'fillGroupSize', e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Columns</legend>
                    <label htmlFor='gridCols'>Total Grid Columns:</label>
                    <input 
                        type='text'
                        name='gridCols'
                        className='gridCols'
                        placeholder={currentGrid.totalColumns}
                        onChange={e => this.context.updateGridCols(this.props.gridId, e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Rows</legend>
                    <label htmlFor='gridRows'>Total Grid Rows:</label>
                    <input 
                        type='text'
                        name='gridRows'
                        className='gridRows'
                        placeholder={currentGrid.totalRows}
                        onChange={e => this.context.updateGridRows(this.props.gridId, e.target.value)}
                    />
                </fieldset>
            </fieldset>
        )
    }
}