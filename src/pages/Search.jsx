import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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

        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Ir para o carrinho.
          </button>
        </Link>

      </section>
    );
  }
}

export default Search;
