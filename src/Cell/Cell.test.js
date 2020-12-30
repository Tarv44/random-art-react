import React, { createElement } from 'react';
import ReactDom from 'react-dom';
import Cell from './Cell';
import {randomRGB} from '../functions/colorFunctions';
import renderer from 'react-test-renderer';

const dummyCell = {
    id: 'c1r1',
    column: 1,
    row: 1,
    gridSize: 'small',
    animationDelay: 1,
    color: {
        red: 0,
        green: 0,
        blue: 0,
        rgb: 'rgba(0, 0, 0, 1)'
    }
}

it('renders without crashing',() => {
    const div = document.createElement('div')
    ReactDom.render(<Cell />, div)
    ReactDom.unmountComponentAtNode(div)
})

it('renders UI as expected', () => {
    const cell = renderer
        .create(<Cell cellData={dummyCell}/>)
        .toJSON()
    expect(cell).toMatchSnapshot();
})