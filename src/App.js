import React from 'react';
import './App.css';
import Grid from './Grid'

function App() {
  return (
    <main className='App'>
      <Grid columns={500} rows={500}/>
    </main>
  );
}

export default App;
