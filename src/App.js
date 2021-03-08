import React, {Component} from 'react';
import Grid from './Grid/Grid';
import {fillCellGroup, fillStart} from './functions/fillGrid';
import Nav from './Nav/Nav';
import { Route } from 'react-router-dom';
import GridStatus from './GridStatus/GridStatus';
import GridContext from './GridContext';
import GridForm from './GridForm/GridForm';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      large: {
        totalColumns: 250,
        totalRows: 120,
        totalCells: null,
        totalCellsFilled: 0,
        filling: false,
        fillableCells: [],
        showForm: true,
        grid: null,
        formConstraints: {
          colorChances: {
            same: 80,
            skew: 19
          },
          skew: {
            changeRange: 10,
            redLow: 0,
            redUpper: 255,
            blueLow: 0,
            blueUpper: 255,
            greenLow: 0,
            greenUpper: 255
          },
          node: {
            totalStart: 1,
            chanceNew: 0,
            chanceNewSame: 0,
            chanceNewDiff: 0
          },
          timeSize: {
            fillGroupSize: 50
          }
        }
      },
      extraLarge: {
        totalColumns: 1250,
        totalRows: 600,
        totalCells: null,
        totalCellsFilled: 0,
        filling: false,
        fillableCells: [],
        showForm: true,
        grid: null,
        formConstraints: {
          colorChances: {
            same: 80,
            skew: 19
          },
          skew: {
            changeRange: 10,
            redLow: 0,
            redUpper: 255,
            blueLow: 0,
            blueUpper: 255,
            greenLow: 0,
            greenUpper: 255
          },
          node: {
            totalStart: 1,
            chanceNew: 0,
            chanceNewSame: 0,
            chanceNewDiff: 0
          },
          timeSize: {
            fillGroupSize: 10
          }
        }
      }
    }
  }

  componentDidMount() {
    //Calculates and sets state for total cells based on total rows and total columns
    this.setState(prevState => ({
      large: {
        ...prevState.large,
        totalCells: this.state.large.totalRows * this.state.large.totalColumns
      },
      extraLarge: {
        ...prevState.extraLarge,
        totalCells: this.state.extraLarge.totalRows * this.state.extraLarge.totalColumns
      }

    }))
  }

  //Start or restart filling grid.
  handleFormStart = (e, gridId) => {
    e.preventDefault();

    this.setState({
      [gridId]: {
        ...this.state[gridId],
        filling: true
      }
    })
    
    //Handle start by filling initial nodes, or restart
    let newGrid = fillStart(this.state[gridId], gridId)

    //Fill amount of cells specified by fillGroupSize 
    newGrid = fillCellGroup(newGrid)

    //Set state with new grid of filled cells
    this.setState({
      [gridId]: newGrid
    })
  }

  //Toggles displaying form
  handleForm = (e, gridId) => {
    e.preventDefault();

    this.setState({ [gridId]: {
      ...this.state[gridId],
      showForm: true
    }})
  }


  //Updates any form values in "Color fill chances section"
  updateColorChances = (gridId, valueId, value) => {
    const numValue = value ? Number(value) : 0
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          colorChances: {
            ...prevState[gridId].formConstraints.colorChances,
            [valueId]: numValue
          }
        }
      }
    }))
  }

  //Updates any form values in "Skew Constraints section"
  updateSkewConstraints = (gridId, valueId, value) => {
    const numValue = value ? Number(value) : 0
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          skew: {
            ...prevState[gridId].formConstraints.skew,
            [valueId]: numValue
          }
        }
      }
    }))
  }

  //Updates any form values in "Node Constraints section"
  updateNodeConstraints = (gridId, valueId, value) => {
    const numValue = value ? Number(value) : 0
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          node: {
            ...prevState[gridId].formConstraints.node,
            [valueId]: numValue
          }
        }
      }
    }))
  }

  //Updates any form values in "Time/Size Constraints section" (excluding total rows and total cells)
  updateTimeSizeConstraints = (gridId, valueId, value) => {
    const numValue = value ? Number(value) : 0
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          timeSize: {
            ...prevState[gridId].formConstraints.timeSize,
            [valueId]: numValue
          }
        }
      }
    }))
  }

  //Updates total rows
  updateGridRows = (gridId, value) => {
    const totalRows = value ? Number(value) : 0
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        totalRows,
        totalCells: totalRows * prevState[gridId].totalColumns
      }
    }))
  }

  //Updates total cells
  updateGridCols = (gridId, value) => {
    const totalColumns = value ? Number(value) : 0
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        totalColumns,
        totalCells: totalColumns * prevState[gridId].totalRows
      }
    }))
  }
  
  
  render() {
    const contextValue = {
      large: this.state.large,
      extraLarge: this.state.extraLarge,
      formStart: this.handleFormStart,
      updateColorChances: this.updateColorChances,
      updateSkewConstraints: this.updateSkewConstraints,
      updateNodeConstraints: this.updateNodeConstraints,
      updateTimeSizeConstraints: this.updateTimeSizeConstraints,
      updateGridRows: this.updateGridRows,
      updateGridCols: this.updateGridCols,
      showForm: this.handleForm
    }

    return (
      <GridContext.Provider value={contextValue}>
        <div className="App">
          <Nav />
          <main >
            {<Route exact path={'/grid/:gridId'} component={GridForm}/>}
            {<Route exact path={'/grid/:gridId'} component={GridStatus}/>}
            {<Route exact path={'/grid/:gridId'} component={Grid}/>}
          </main>
        </div> 
      </GridContext.Provider>    
    );
  }
  
}

export default App;