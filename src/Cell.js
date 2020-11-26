import React from 'react';
import './Cell.css';
// import RandomRBG from './RandomRBG';



export default function Cell(props) {
    const style = {}
    const red =  Math.round(Math.random() * 255)
    const blue = Math.round(Math.random() * 255)
    const green = Math.round(Math.random() * 255)
    style.backgroundColor=`rgb(${red}, ${blue}, ${green})`
    const id = `c${props.column}r${props.row}`
    return (
        <div 
            data-column={props.column} 
            data-row={props.row} 
            id={id}className="cell" 
            style={style}>
        </div>
    )
}