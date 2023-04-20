import React, { Component } from 'react';
// import { getProductById } from '../services/api';
import { getSavedCartIDs } from '../services/saveCart';

class Cart extends Component {
  state = {
    productCart: [],
  };

  componentDidMount() {
    this.getProductsSave();
  }

  getProductsSave = () => {
    // const { productCart } = this.state;
    const productCart = getSavedCartIDs();
    this.setState({
      productCart,
    });
  };

  render() {
    const { productCart } = this.state;
    console.log(productCart);
    const verifyProductCart = productCart.length > 0;
    return (
      <section>
        { verifyProductCart ? (
          productCart.map((product, index) => (
            <section
              key={ index }
              data-testid="shopping-cart-product-name"
            >
              <img src={ product.thumbnail } alt="" />
              <p>
                {product.title}

              </p>
              <p>{ product.price}</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {productCart.length}
              </p>
            </section>
          ))
        ) : (
          <div
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </div>
        )}
      </section>
    );
  }
}

export default Cart;
