import React from 'react';
import './Grid.css'
import Column from './Column'
import makeNullsArray from './_makeNullsArray'

export default function Grid(props) {
    const emptyColumns = makeNullsArray(props.columns)
    const columns = emptyColumns.map((_,i) => {
        return <Column rows={props.rows} currentColumn={i}/>
    })
    console.log(columns)
    return (
        <div className="grid">
            {columns}
        </div>
    )
}