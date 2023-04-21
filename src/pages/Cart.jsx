import React, { Component } from 'react';
// import { getProductById } from '../services/api';
import { getSavedCartIDs } from '../services/saveCart';
import ProductCreations from '../components/ProductCreations';

class Cart extends Component {
  state = {
    productCart: [],
    totalValue: 0,
  };

  componentDidMount() {
    this.getProductsSave();
  }

  getProductsSave = () => {
    const productCart = getSavedCartIDs();
    this.setState({
      productCart,
    });
  };

  updateCart = (productId, totalValue) => {
    const { productCart } = this.state;
    const updatedProductCart = productCart.filter((product) => product.id !== productId);
    this.setState({
      productCart: updatedProductCart,
      totalValue,
    });
  };

  render() {
    const { productCart, totalValue } = this.state;
    const verifyProductCart = productCart.length > 0;
    return (
      <section>
        { verifyProductCart ? (
          <section>
            {productCart.map((product, index) => (
              <ProductCreations
                key={ index }
                index={ index }
                product={ product }
                productCart={ productCart.length }
                updateCart={ this.updateCart }
              />
            ))}
            <div>
              <p>
                Total dos Produtos:
                {totalValue}
              </p>
            </div>
          </section>
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
