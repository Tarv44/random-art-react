import {Component} from 'react';
import GridContext from '../GridContext';
import './SkewConstraints.css';

export default class SkewConstraints extends Component {
    static contextType = GridContext;
    render() {
        const currentGrid = this.context[this.props.gridId]
        return (
            <fieldset>
                <legend>Skew Constraints</legend>
                <fieldset>
                    <legend>Range</legend>
                    <label htmlFor='skewRange'>Range of color change (e.g. +-10):</label>
                    <input 
                        type='text' 
                        name='skewRange' 
                        className='skewRange'
                        value={currentGrid.formConstraints.skewConstraints.changeRange}
                        onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'changeRange', e.target.value)}
                    />
                </fieldset>
            </fieldset>
        )
    }
}