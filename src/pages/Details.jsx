import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';
import { saveCartID } from '../services/saveCart';
import ProductRating from '../components/ProductRating';

class Details extends Component {
  state = {
    productId: {},
  };

  componentDidMount() {
    this.fetchRequisitionProductId();
  }

  fetchRequisitionProductId = async () => {
    const { match: { params: { id } } } = this.props;
    const productId = await getProductById(id);
    this.setState({
      productId,
    });
  };

  addToCart = (id) => {
    saveCartID(id);
  };

  render() {
    const { productId } = this.state;
    const verifyProductId = productId.attributes > 0;
    return (
      <>
        <section>
          <div>
            <img
              data-testid="product-detail-image"
              src={ ` ${productId.thumbnail}` }
              alt=""
            />
            <p data-testid="product-detail-name">{productId.title}</p>
            <p
              data-testid="product-detail-price"
            >
              {productId.price}

            </p>
            {verifyProductId && (
              <ul>
                {productId.attributes.map((attribut, index) => (
                  <li
                    key={ index }
                  >
                    {`${attribut.name}: ${attribut.value_name} `}
                  </li>
                ))}
              </ul>
            )}
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ () => this.addToCart(productId) }
            >
              Adicionar ao carrinho
            </button>
          </div>

          <Link to="/cart">
            <button
              type="button"
              data-testid="shopping-cart-button"
            >
              Ir para o carrinho.
            </button>
          </Link>

        </section>
        <ProductRating productId={ productId } />

      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
