import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { removeCartID } from '../services/saveCart';

class ProductCreations extends Component {
  state = {
    valueCart: 1,
    // everyProductsOfCart: [],
    disableButton: false,
    totalValue: 0,
  };

  componentDidMount() {
    this.verifyDisable();
  }

  verifyDisable = () => {
    const { valueCart } = this.state;
    if (valueCart > 0) {
      this.setState({ disableButton: false });
    }
    if (valueCart === 1) {
      this.setState({ disableButton: true });
    }
  };

  addItem = () => {
    // saveCartID(id);
    const { valueCart } = this.state;
    this.setState(
      { valueCart: valueCart + 1 },
      this.verifyDisable,
      this.totalValueOfCart,
    );
  };

  removeItem = () => {
    // removeCartID(id);
    const { valueCart } = this.state;
    this.setState(
      { valueCart: valueCart - 1 },
      this.verifyDisable,
      this.totalValueOfCart,
    );
  };

  totalValueOfCart = () => {
    const { product } = this.props;
    const { price } = product;
    const { valueCart } = this.state;
    this.setState({ totalValue: price * valueCart });
  };

  removeOfCart = (productID) => {
    const { totalValue } = this.state;
    const { updateCart } = this.props;
    removeCartID(productID);
    updateCart(productID, totalValue);
  };

  render() {
    const { product } = this.props;
    const { id, thumbnail, title, price } = product;
    const { valueCart, disableButton } = this.state;
    return (
      <section
        className="flex__container__prices"
      >
        <img src={ thumbnail } alt="" />
        <p data-testid="shopping-cart-product-name">
          {title}

        </p>
        <p>{ price * valueCart}</p>

        <button
          onClick={ this.addItem }
          data-testid="product-increase-quantity"
        >
          +
        </button>

        <div data-testid="shopping-cart-product-quantity">
          {valueCart}
        </div>

        <button
          onClick={ this.removeItem }
          disabled={ disableButton }
          data-testid="product-decrease-quantity"
        >
          -
        </button>

        <button
          onClick={ () => this.removeOfCart(id) }
          data-testid="remove-product"
        >
          Remover Item
        </button>
      </section>
    );
  }
}

ProductCreations.propTypes = {
  // index: PropTypes.number.isRequired,
  updateCart: PropTypes.func.isRequired,
  // productCart: PropTypes.number.isRequired,
  product: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCreations;

// productOfCarts = () => {
//   const products = getSavedCartIDs();
//   this.setState({ everyProductsOfCart: products });
// };
