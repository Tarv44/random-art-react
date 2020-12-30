import React, {Component} from 'react';
import Grid from './Grid/Grid';
import generateEmptyGrid from './functions/generateEmptyGrid';
import {randomRGB} from './functions/colorFunctions';
import {fillColor, fillInitCells} from './functions/fillGrid';
import Nav from './Nav/Nav';
import {Route ,Redirect} from 'react-router-dom';
import GridContext from './GridContext';
import GridForm from './GridForm/GridForm'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyGridsRendered: false,
      small: {
        totalColumns: 25,
        totalRows: 12,
        intervalDelay: 1000,
        grid: null
      },
      medium: {
        totalColumns: 42,
        totalRows: 20,
        intervalDelay: 750,
        grid: null
      },
      large: {
        totalColumns: 84,
        totalRows: 40,
        intervalDelay: 500,
        grid: null
      },
      extraLarge: {
        totalColumns: 250,
        totalRows: 120,
        intervalDelay: 250,
        grid: null
      }
    }
  }

  componentDidMount() {
    this.setState(prevState => ({
      emptyGridsRendered: true,
      small: {
        ...prevState.small,
        grid: generateEmptyGrid(this.state.small, 'small'),
      },
      medium: {
        ...prevState.medium,
        grid: generateEmptyGrid(this.state.medium, 'medium')
      },
      large: {
        ...prevState.large,
        grid: generateEmptyGrid(this.state.large, 'large')
      },
      extraLarge: {
        ...prevState.extraLarge,
        grid: generateEmptyGrid(this.state.extraLarge, 'extraLarge')
      }

    }))   
  }

  handleFormSubmit = (event, gridId) => {
    event.preventDefault();

    const firstState = fillInitCells(this.state, gridId);
    this.setState({
      firstState
    })

    const intervalDelay = this.state[gridId].intervalDelay;
    const gridSize = this.state[gridId].totalColumns * this.state[gridId].totalRows
    let count = 0
    const fillInterval = setInterval(() => {
      if (count < gridSize) {
        const newState = fillColor(this.state, gridId)
        this.setState({
          newState
        })
        count += 1;
      } else {
        clearInterval(fillInterval);
      }
    },intervalDelay);
    // const newState = this.state;
    // newState[gridId].grid.columns[0][0].color = randomRGB();
    // 
  }
  
  
  render() {
    const contextValue = {
      small: this.state.small,
      medium: this.state.medium,
      large: this.state.large,
      extraLarge: this.state.extraLarge,
      formSubmit: this.handleFormSubmit
    }

    return (
      <GridContext.Provider value={contextValue}>
        <div className="App">
          <Nav />
          <main >
            {this.state.emptyGridsRendered && <Route exact path={'/grid/:gridId'} component={GridForm}/>}
            {this.state.emptyGridsRendered && <Route exact path={'/grid/:gridId'} component={Grid}/>}
          </main>
        </div> 
      </GridContext.Provider>    
    );
  }
  
}

export default App;