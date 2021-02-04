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
        return (
            <form onSubmit={e => this.context.formStart(e, this.props.match.params.gridId)}>
                <h2>Form Displayed Here</h2>
                <ColorFillChances gridId={this.props.match.params.gridId}/>
                <SkewConstraints gridId={this.props.match.params.gridId}/>
                <NodeConstraints gridId={this.props.match.params.gridId}/>
                <TimeSizeConstraints gridId={this.props.match.params.gridId}/>
                <button type='submit'>Start</button>
            </form>
        )
    }
}