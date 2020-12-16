import React, {Component} from 'react';
import './Cell.css'

export default class Cell extends Component {
    render() {
        const cellColor = this.props.cellData.color.rgb
        return (
            <div style={{backgroundColor: cellColor}} className={'cell ' + this.props.cellData.gridSize}/>
        )
    }
}