import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../components/Input';
import { getCategories } from '../services/api';

class Search extends Component {
  state = {
    search: '',
    categories: [],
  };

  componentDidMount() {
    this.fetchRequisitionAPICategories();
  }

  fetchRequisitionAPICategories = async () => {
    const result = await getCategories();
    console.log(result);
    this.setState({ categories: result });
  };

  handlerChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { search, categories } = this.state;
    return (
      <section>
        <Input
          placeholder="Search"
          type="text"
          name="search"
          value={ search }
          onChange={ this.handlerChange }
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <section className="categories">
          {categories.map((categoria, index) => (
            <button
              type="button"
              key={ index }
              data-testid="category"
              className="button__categorie"
            >
              {categoria.name}
            </button>
          ))}
        </section>

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
