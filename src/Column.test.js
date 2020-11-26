import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Column />, div);
    ReactDOM.unmountComponentAtNode(div);
});