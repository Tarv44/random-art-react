import React from 'react';
import ReactDOM from 'react-dom';
import Cell from './Cell';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cell />, div);
    ReactDOM.unmountComponentAtNode(div);
});