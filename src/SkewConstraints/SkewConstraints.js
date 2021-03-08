import {Component} from 'react';
import GridContext from '../GridContext';
import './SkewConstraints.css';

export default class SkewConstraints extends Component {
    static contextType = GridContext;
    render() {
        const currentGrid = this.context[this.props.gridId]
        return (
            <fieldset className='skewConst'>
                <legend>Skew Constraints</legend>
                <fieldset>
                    <legend>Range</legend>
                    <label htmlFor='skewRange'>Range of color change (e.g. +-10):</label>
                    <input 
                        type='text' 
                        name='skewRange' 
                        className='skewRange'
                        placeholder={currentGrid.formConstraints.skew.changeRange}
                        onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'changeRange', e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Red Limits</legend>
                    <div>
                        <label htmlFor='redLow'>Red lower limit:</label>
                        <input 
                            type='text' 
                            name='redLow' 
                            className='redLow'
                            placeholder={currentGrid.formConstraints.skew.redLow}
                            onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'redLow', e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='redUpper'>Red upper limit:</label>
                        <input 
                            type='text' 
                            name='redUpper' 
                            className='redUpper'
                            placeholder={currentGrid.formConstraints.skew.redUpper}
                            onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'redUpper', e.target.value)}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Green Limits</legend>
                    <div>
                        <label htmlFor='greenLow'>Green lower limit:</label>
                        <input 
                            type='text' 
                            name='greenLow' 
                            className='greenLow'
                            placeholder={currentGrid.formConstraints.skew.greenLow}
                            onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'greenLow', e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='greenUpper'>Green upper limit:</label>
                        <input 
                            type='text' 
                            name='greenUpper' 
                            className='greenUpper'
                            placeholder={currentGrid.formConstraints.skew.greenUpper}
                            onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'greenUpper', e.target.value)}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Blue Limits</legend>
                    <div>
                        <label htmlFor='blueLow'>Blue lower limit:</label>
                        <input 
                            type='text' 
                            name='blueLow' 
                            className='blueLow'
                            placeholder={currentGrid.formConstraints.skew.blueLow}
                            onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'blueLow', e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='blueUpper'>Blue upper limit:</label>
                        <input 
                            type='text' 
                            name='blueUpper' 
                            className='blueUpper'
                            placeholder={currentGrid.formConstraints.skew.blueUpper}
                            onChange={e => this.context.updateSkewConstraints(this.props.gridId, 'blueUpper', e.target.value)}
                        />
                    </div>
                </fieldset>
            </fieldset>
        )
    }
}