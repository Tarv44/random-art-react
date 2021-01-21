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
                    <legend>Time Interval</legend>
                    <label htmlFor='timeInterval'>Interval between each color fill (milliseconds):</label>
                    <input 
                        type='text'
                        name='timeInterval'
                        className='timeInterval'
                        value={currentGrid.formConstraints.timeSize.intervalDelay}
                        onChange={e => this.context.updateTimeSizeConstraints(this.props.gridId, 'intervalDelay', e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Group Fill Percentage</legend>
                    <label htmlFor='timeInterval'>Amount of grid filled at each interval (percent):</label>
                    <input 
                        type='text'
                        name='groupSize'
                        className='groupSize'
                        value={currentGrid.formConstraints.timeSize.fillGroupSize}
                        onChange={e => this.context.updateTimeSizeConstraints(this.props.gridId, 'fillGroupSize', e.target.value)}
                    />
                </fieldset>
            </fieldset>
        )
    }
}