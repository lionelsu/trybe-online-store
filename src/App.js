import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Search from './pages/Search';
import Cart from './pages/Cart';
import './App.css';

export class App extends Component {
  render() {
    return (
      <main>

        <Switch>
          <Route exact path="/cart" component={ Cart } />
        </Switch>

        <Search />
      </main>
    );
  }
}

export default App;
