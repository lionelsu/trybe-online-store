import React, { Component } from 'react';
import Input from '../components/Input';

class Search extends Component {
  state = {
    search: true,
  };

  render() {
    const { search } = this.state;
    return (
      <section>
        <Input
          placeholder="Search"
          type="search"
        />
        {search && (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
      </section>
    );
  }
}

export default Search;
