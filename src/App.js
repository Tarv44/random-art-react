import React, {Component} from 'react';
import Grid from './Grid/Grid';
import {fillCellGroup, fillStart} from './functions/fillGrid';
import Nav from './Nav/Nav';
import { Route } from 'react-router-dom';
import GridStatus from './GridStatus/GridStatus';
import GridContext from './GridContext';
import GridForm from './GridForm/GridForm'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      large: {
        firstPortionFilled: false,
        totalColumns: 250,
        totalRows: 120,
        totalCells: null,
        totalCellsFilled: 0,
        filledThisRound: 0,
        filling: false,
        fillableCells: [],
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
            intervalDelay: 500,
            fillGroupSize: 50,
            stopPoint: 10
          }
        }
      },
      extraLarge: {
        firstPortionFilled: false,
        totalColumns: 1250,
        totalRows: 600,
        totalCells: null,
        totalCellsFilled: 0,
        filledThisRound: 0,
        filling: false,
        fillableCells: [],
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
            intervalDelay: 250,
            fillGroupSize: 10,
            stopPoint: 10
          }
        }
      }
    }
  }

  componentDidMount() {
    this.setState(prevState => ({
      // emptyGridsRendered: true,
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

  handleFormStart = (event, gridId) => {
    event.preventDefault();

    this.setState({
      [gridId]: {
        ...this.state[gridId],
        filling: true
      }
    })
    
    this.setState({ [gridId]: fillStart(this.state[gridId], gridId) })
    
    const intervalDelay = this.state[gridId].formConstraints.timeSize.intervalDelay;
    const fillInterval = setInterval(() => {
      const grid = this.state[gridId]
      if (grid.fillableCells.length !== 0 
        && grid.filledThisRound < grid.formConstraints.timeSize.stopPoint) {
        const newState = fillCellGroup(grid)
        this.setState({
          [gridId]: newState
        })
      } else {
        this.setState({
          ...this.state,
          [gridId]: {
            ...this.state[gridId],
            filling: false,
            filledThisRound: 0, 
          }
        })
        clearInterval(fillInterval);
        console.log('interval cleared')
      }
    },intervalDelay);
  }


  // handleFormStop = (event, gridId) => {
  //   event.preventDefault();

  //   this.setState({
  //     [gridId]: {
  //       ...this.state[gridId],
  //       filling: false
  //     }
  //   })
  // }

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
      formStop: this.handleFormStop
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