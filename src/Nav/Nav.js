import {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css'

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <NavLink to={'/grid/small'}>Small</NavLink>
                <NavLink to={'/grid/medium'}>Medium</NavLink>
                <NavLink to={'/grid/large'}>Large</NavLink>
                <NavLink to={'/grid/extraLarge'}>Extra Large</NavLink>
            </nav>
        )
    }
}