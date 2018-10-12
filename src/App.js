import React, { Component } from 'react';
import './App.css';
import ReservationForm from './reservation/reservation-form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ReservationForm />
        </header>
      </div>
    );
  }
}

export default App;
