import {Component} from 'react';
import GridContext from '../GridContext';
import './TimeSizeConstraints.css';

export default class TimeSizeConstraints extends Component {
    static contextType = GridContext
    render() {
        const currentGrid = this.context[this.props.gridId]
        return (
            <fieldset className='timeSizeConstraints'>
                <legend>Time/Size Constraints</legend>
                <fieldset>
                    <legend>Time Interval</legend>
                    <label htmlFor='timeInterval'>Interval between each color fill (milliseconds):</label>
                    <input 
                        type='text'
                        name='timeInterval'
                        className='timeInterval'
                        value={currentGrid.formConstraints.timeSizeConstraints.intervalDelay}
                        onChange={e => this.context.updateTimeSizeConstraints(this.props.gridId, 'intervalDelay', e.target.value)}
                    />
                </fieldset>
            </fieldset>
        )
    }
}