import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductById } from '../services/api';

class Details extends Component {
  state = {
    productId: {},
  };

  componentDidMount() {
    this.fetchRequisitionProductId();
  }

  fetchRequisitionProductId = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const productId = await getProductById(id);
    this.setState({
      productId,
    });
  };

  render() {
    const { productId } = this.state;
    const verifyProductId = productId.attributes > 0;
    return (
      <section>
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

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
