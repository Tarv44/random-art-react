import React, {Component} from 'react';
import Grid from './Grid/Grid';
import generateEmptyGrid from './functions/generateEmptyGrid';
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
        grid: null
      },
      medium: {
        totalColumns: 42,
        totalRows: 20,
        grid: null
      },
      large: {
        totalColumns: 84,
        totalRows: 40,
        grid: null
      },
      extraLarge: {
        totalColumns: 250,
        totalRows: 120,
        grid: null
      }
    }
  }

  componentDidMount() {
    this.setState({
      emptyGridsRendered: true,
      small: {
        grid: generateEmptyGrid(this.state.small, 'small')
      },
      medium: {
        grid: generateEmptyGrid(this.state.medium, 'medium')
      },
      large: {
        grid: generateEmptyGrid(this.state.large, 'large')
      },
      extraLarge: {
        grid: generateEmptyGrid(this.state.extraLarge, 'extraLarge')
      }

    })   
  }
  
  
  render() {
    const contextValue = {
      small: this.state.small,
      medium: this.state.medium,
      large: this.state.large,
      extraLarge: this.state.extraLarge
    }

    return (
      <GridContext.Provider value={contextValue}>
        <div className="App">
          <Nav />
          <main >
          {this.state.emptyGridsRendered && <Route exact path={'/grid/:gridId'} component={GridForm}/>}
            {this.state.emptyGridsRendered && <Route exact path={'/grid/:gridId'} component={Grid}/>}
            <Redirect exact from="/" to="/grid/small" />
          </main>
        </div> 
      </GridContext.Provider>    
    );
  }
  
}

export default App;