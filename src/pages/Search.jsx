import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../components/Input';
import { getCategories, getProductById, getProductsFromCategoryAndQuery } from '../services/api';
import Details from './Details';

class Search extends Component {
  state = {
    search: '',
    categories: [],
    searchProduct: [],
    isProduct: true,
    productId: {},
    rendery: false,
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
    const { search, categoryId } = this.state;
    const result = await getProductsFromCategoryAndQuery(categoryId, search);
    const realResult = result.results;
    if (realResult.length === 0) {
      this.setState({ isProduct: false });
    }
    this.setState({ searchProduct: realResult });
  };

  handlerChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  categoryByClick = async (categoryId, query) => {
    const result = await getProductsFromCategoryAndQuery(categoryId, query);
    const realResult = result.results;

    this.setState({ searchProduct: realResult, isProduct: true });
    console.log(realResult);
  };

  render() {
    const { search, categories, searchProduct, isProduct, productId, rendery } = this.state;
    console.log(productId);
    return (
      <section>
        {rendery && <Details 
        productId={productId}
        />}
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
              onClick={ () => this.categoryByClick(categoria.id, categoria.name) }
            >

              {categoria.name}
            </button>
          ))}
        </section>
        <section>
          {isProduct ? (
            searchProduct.map((product, index) => (
              <Link 
                data-testid="product-detail-link"
                to={`/details/${product.id} `}
                key={ index }
              >
                <p
                 data-testid="product">
                  {product.title}</p>
                <p>{product.price}</p>
                <img src={ product.thumbnail } alt={ product.title } />
              </Link>
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
