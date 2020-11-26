import React from 'react';
import './Column.css'
import Cell from './Cell.js'
import makeNullsArray from './_makeNullsArray';

export default function Column(props) {
    const emptyRows = makeNullsArray(props.rows);
    const rows = emptyRows.map((_,i) => {
        return <Cell column={props.currentColumn} row={i}/>
    })
    const id = `c${props.currentColumn}`
    return(
        <div className="column" id={id} data-column={props.currentColumn}>
            {rows}
        </div>
    )
    
}