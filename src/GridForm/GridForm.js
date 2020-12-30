import React, {Component} from 'react';
import GridContext from '../GridContext';
import './GridForm.css';

export default class GridForm extends Component {
    static contextType = GridContext;

    render() {
        return (
            <form onSubmit={e => this.context.formSubmit(e, this.props.match.params.gridId)}>
                <h2>Form Displayed Here</h2>
                <button type='submit'>Generate Random Colors</button>
            </form>
        )
    }
}