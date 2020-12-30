import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import Column from './Column'
import {generateDummyGrid} from '../functions/generateEmptyGrid';

const dummyGrid = generateDummyGrid();
const dummyColumn = dummyGrid[0]

it('renders without crashing',() => {
    const div = document.createElement('div');
    ReactDom.render(<Column/>, div)
    ReactDom.unmountComponentAtNode(div)
})

it('renders UI as expected', () => {
    const column = renderer
        .create(<Column columnData={dummyColumn}/>)
        .toJSON();
    expect(column).toMatchSnapshot();
})