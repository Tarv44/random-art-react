import React, {Component} from 'react';
import GridContext from '../GridContext';
import ColorFillChances from '../colorFillChances/colorFillChances';
import SkewConstraints from '../SkewConstraints/SkewConstraints';
import NodeConstraints from '../NodeConstraints/NodeConstraints';
import TimeSizeConstraints from '../TimeSizeConstraints/TimeSizeConstraints'
import './GridForm.css';

export default class GridForm extends Component {
    static contextType = GridContext;

    render() {
        const gridId = this.props.match.params.gridId

        const formDisplay = this.context[gridId].showForm ? (
            <form onSubmit={e => this.context.formStart(e, gridId)}>
                <h2>Form Displayed Here</h2>
                <ColorFillChances gridId={gridId}/>
                <SkewConstraints gridId={gridId}/>
                <NodeConstraints gridId={gridId}/>
                <TimeSizeConstraints gridId={gridId}/>
                <button type='submit'>Start</button>
            </form>
        ) : <button className="adjust-form" onClick={e => this.context.showForm(e, gridId)} >Adjust Form</button>

        return  formDisplay
    }
}