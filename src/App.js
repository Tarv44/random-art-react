import React, {Component} from 'react';
import Grid from './Grid/Grid';
import generateEmptyGrid from './functions/generateEmptyGrid';
import {randomRGB} from './functions/colorFunctions';
import {fillColor, fillStart} from './functions/fillGrid';
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
        totalColumns: 10, //25
        totalRows: 10, //12
        totalCells: null,
        totalCellsFilled: 0,
        filling: false,
        fillCenters: [],
        fillableCells: [],
        grid: null,
        formConstraints: {
          colorChances: {
            same: 80,
            skew: 19
          },
          skewConstraints: {
            changeRange: 10
          },
          nodeConstraints: {
            totalStart: 1,
            chanceNew: 0,
            chanceNewSame: 0,
            chanceNewDiff: 0
          },
          timeSizeConstraints: {
            intervalDelay: 1000
          }
        }
      },
      medium: {
        totalColumns: 42,
        totalRows: 20,
        totalCells: null,
        totalCellsFilled: 0,
        filling: false,
        fillCenters: [],
        fillableCells: [],
        grid: null,
        formConstraints: {
          colorChances: {
            same: 80,
            skew: 19
          },
          skewConstraints: {
            changeRange: 10
          },
          nodeConstraints: {
            totalStart: 1,
            chanceNew: 0,
            chanceNewSame: 0,
            chanceNewDiff: 0
          },
          timeSizeConstraints: {
            intervalDelay: 750
          }
        }
      },
      large: {
        totalColumns: 84,
        totalRows: 40,
        totalCells: null,
        totalCellsFilled: 0,
        filling: false,
        fillCenters: [],
        fillableCells: [],
        grid: null,
        formConstraints: {
          colorChances: {
            same: 80,
            skew: 19
          },
          skewConstraints: {
            changeRange: 10
          },
          nodeConstraints: {
            totalStart: 1,
            chanceNew: 0,
            chanceNewSame: 0,
            chanceNewDiff: 0
          },
          timeSizeConstraints: {
            intervalDelay: 500
          }
        }
      },
      extraLarge: {
        totalColumns: 250,
        totalRows: 120,
        totalCells: null,
        totalCellsFilled: 0,
        filling: false,
        fillCenters: [],
        fillableCells: [],
        grid: null,
        formConstraints: {
          colorChances: {
            same: 80,
            skew: 19
          },
          skewConstraints: {
            changeRange: 10
          },
          nodeConstraints: {
            totalStart: 1,
            chanceNew: 0,
            chanceNewSame: 0,
            chanceNewDiff: 0
          },
          timeSizeConstraints: {
            intervalDelay: 250
          }
        }
      }
    }
  }

  componentDidMount() {
    this.setState(prevState => ({
      emptyGridsRendered: true,
      small: {
        ...prevState.small,
        totalCells: this.state.small.totalRows * this.state.small.totalColumns,
        grid: generateEmptyGrid(this.state.small, 'small'),
      },
      medium: {
        ...prevState.medium,
        totalCells: this.state.medium.totalRows * this.state.medium.totalColumns,
        grid: generateEmptyGrid(this.state.medium, 'medium')
      },
      large: {
        ...prevState.large,
        totalCells: this.state.large.totalRows * this.state.large.totalColumns,
        grid: generateEmptyGrid(this.state.large, 'large')
      },
      extraLarge: {
        ...prevState.extraLarge,
        totalCells: this.state.extraLarge.totalRows * this.state.extraLarge.totalColumns,
        grid: generateEmptyGrid(this.state.extraLarge, 'extraLarge')
      }

    }))   
  }

  handleFormStart = (event, gridId) => {
    event.preventDefault();

    this.setState({ [gridId]: fillStart(this.state[gridId],gridId)})

    const intervalDelay = this.state[gridId].formConstraints.timeSizeConstraints.intervalDelay;
    const fillInterval = setInterval(() => {
      if (this.state[gridId].totalCellsFilled < this.state[gridId].totalCells && this.state[gridId].filling) {
        this.setState({
          [gridId]: fillColor(this.state[gridId])
        })
      } else {
        if (this.state[gridId].filling) {
          this.setState({
            [gridId]: {
              ...this.state[gridId],
              filling: false
            }
          })
        }
        clearInterval(fillInterval);
        console.log('interval cleared')
      }
    },intervalDelay);
  }

  handleFormStop = (event, gridId) => {
    event.preventDefault();

    this.setState({
      [gridId]: {
        ...this.state[gridId],
        filling: false
      }
    })
  }

  updateColorChances = (gridId, valueId, value) => {
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          colorChances: {
            ...prevState[gridId].formConstraints.colorChances,
            [valueId]: value
          }
        }
      }
    }))
  }

  updateSkewConstraints = (gridId, valueId, value) => {
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          skewConstraints: {
            ...prevState[gridId].formConstraints.skewConstraints,
            [valueId]: value
          }
        }
      }
    }))
  }

  updateNodeConstraints = (gridId, valueId, value) => {
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          nodeConstraints: {
            ...prevState[gridId].formConstraints.nodeConstraints,
            [valueId]: value
          }
        }
      }
    }))
  }

  updateTimeSizeConstraints = (gridId, valueId, value) => {
    this.setState(prevState => ({
      ...prevState,
      [gridId]: {
        ...prevState[gridId],
        formConstraints: {
          ...prevState[gridId].formConstraints,
          timeSizeConstraints: {
            ...prevState[gridId].formConstraints.timeSizeConstraints,
            [valueId]: value
          }
        }
      }
    }))
  }
  
  
  render() {
    const contextValue = {
      small: this.state.small,
      medium: this.state.medium,
      large: this.state.large,
      extraLarge: this.state.extraLarge,
      formStart: this.handleFormStart,
      updateColorChances: this.updateColorChances,
      updateSkewConstraints: this.updateSkewConstraints,
      updateNodeConstraints: this.updateNodeConstraints,
      updateTimeSizeConstraints: this.updateTimeSizeConstraints,
      formStop: this.handleFormStop
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