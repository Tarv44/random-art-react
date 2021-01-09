import {Component} from 'react';
import GridContext from '../GridContext';
import './NodeConstraints.css';

export default class NodeConstraints extends Component {
    static contextType = GridContext;
    render() {
        const currentGrid = this.context[this.props.gridId]
        return (
            <fieldset className='nodeConstraints'>
                <legend>Node Constraints</legend>
                <fieldset>
                    <legend>Start</legend>
                    <label htmlFor='startNodes'>Amount of starting nodes:</label>
                    <input 
                        type='text' 
                        name='startNode' 
                        className='startNode'
                        value={currentGrid.formConstraints.nodeConstraints.totalStart}
                        onChange={e => this.context.updateNodeConstraints(this.props.gridId, 'totalStart', e.target.value)}
                    />
                </fieldset>
                {/* <fieldset>
                    <legend>New Nodes</legend>
                    <label htmlFor='newNodes'>Chance of introducing new nodes:</label>
                    <input 
                        type='text' 
                        name='newNode' 
                        className='newNode'
                        value={currentGrid.formConstraints.nodeConstraints.chanceNew}
                        onChange={e => this.context.updateNodeConstraints(this.props.gridId, 'chanceNew', e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Similar Node</legend>
                    <label htmlFor='sameNode'>Chance that new node gets the previous used color:</label>
                    <input 
                        type='text' 
                        name='sameNode' 
                        className='sameNode'
                        value={currentGrid.formConstraints.nodeConstraints.chanceNewSame}
                        onChange={e => this.context.updateNodeConstraints(this.props.gridId, 'chanceNewSame', e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Random Node</legend>
                    <label htmlFor='randomNode'>Chance that new node gets a completely random color:</label>
                    <input 
                        type='text' 
                        name='randomNode' 
                        className='randomNode'
                        value={currentGrid.formConstraints.nodeConstraints.chanceNewDiff}
                        onChange={e => this.context.updateNodeConstraints(this.props.gridId, 'chanceNewDiff', e.target.value)}
                    />
                </fieldset> */}
            </fieldset>
        )
    }
}