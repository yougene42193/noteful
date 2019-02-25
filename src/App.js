import React, { Component } from 'react';
import Header from './Header/Header'
import Note from './Note/Note'

class App extends Component {
  render() {
    return (
      <main className="App">
        <Header />
        <Note />
      </main>
    );
  }
}

export default App;
