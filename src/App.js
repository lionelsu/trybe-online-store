import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Search from './pages/Search';
import Cart from './pages/Cart';
import './App.css';
import Details from './pages/Details';

export class App extends Component {
  render() {
    return (
      <main>

        <Switch>
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/details/:id" component={ Details } />
          <Route exact path="/" component={ Search } />
        </Switch>

      </main>
    );
  }
}

export default App;
