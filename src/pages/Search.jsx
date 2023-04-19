import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../components/Input';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Search extends Component {
  state = {
    search: '',
    categories: [],
    searchProduct: [],
    isProduct: true,
  };

  componentDidMount() {
    this.fetchRequisitionAPICategories();
  }

  fetchRequisitionAPICategories = async () => {
    const result = await getCategories();
    console.log(result);
    this.setState({ categories: result });
  };

  searchProduct = async () => {
    const { search } = this.state;
    const result = await getProductsFromCategoryAndQuery(search);
    const realResult = result.results;
    if (realResult.length === 0) {
      this.setState({ isProduct: false });
    }
    this.setState({ searchProduct: realResult });
  };

  handlerChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { search, categories, searchProduct, isProduct } = this.state;
    return (
      <section>
        <div>
          <Input
            placeholder="Search"
            type="text"
            name="search"
            value={ search }
            onChange={ this.handlerChange }
            test="query-input"
          />
          <button
            type="button"
            onClick={ this.searchProduct }
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <section className="categories">
          {categories.map((categoria) => (
            <button
              type="button"
              key={ categoria.id }
              data-testid="category"
              className="button__categorie"
            >
              {categoria.name}
            </button>
          ))}
        </section>
        <section>
          {isProduct ? (
            searchProduct.map((product, index) => (
              <div
                key={ index }
                data-testid="product"
              >
                <p>{product.title}</p>
                <p>{product.price}</p>
                <img src={ product.thumbnail } alt={ product.title } />
              </div>
            ))
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )}

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
