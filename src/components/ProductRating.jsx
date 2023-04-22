import PropTypes from 'prop-types';
import React from 'react';
import LocalStorageManager from './LocalStorageManager';

const localStorageManager = LocalStorageManager.getInstance();

export default class ProductRating extends React.Component {
  state = {
    email: '',
    text: '',
    rating: '',
    validate: false,
    allReviews: [],
  };

  notasAvaliacao = {
    1: 'Péssimo',
    2: 'Ruim',
    3: 'Regular',
    4: 'Bom',
    5: 'Excelente',
  };

  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (productId.id !== prevProps.productId.id) {
      console.log('componentDidUpdate chamado!');
      this.setState({
        allReviews: localStorageManager.getItem(productId.id),
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, rating, text, allReviews } = this.state;
    const { productId } = this.props;
    if (email && rating) {
      const newReview = { email, rating, text };
      const newAllReviews = [...allReviews, newReview];
      this.setState({
        allReviews: newAllReviews,
        email: '',
        text: '',
        rating: '',
        validate: false,
      }, () => {
        localStorageManager.setItem(productId.id, newAllReviews);
      });
    } else {
      this.setState({ validate: true });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRating = (event) => {
    this.setState({ rating: event.target.value });
  };

  render() {
    const { email, text, validate, rating, allReviews } = this.state;
    console.log(email);
    console.log(text);
    console.log(rating);
    console.log(validate);
    console.log(allReviews);

    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          <h3>Avaliações</h3>
          <fieldset>
            <input
              data-testid="product-detail-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              placeholder="Email"
              onChange={ this.handleChange }
              required
            />

            <div>
              {Object.keys(this.notasAvaliacao).map((rate) => (
                <label key={ rate }>
                  <input
                    type="radio"
                    name="rating"
                    value={ rate }
                    checked={ rating === rate }
                    onChange={ this.handleRating }
                    required
                  />
                  <span data-testid={ `${rate}-rating` }>{rate}</span>
                </label>
              ))}
            </div>

            <textarea
              data-testid="product-detail-evaluation"
              name="text"
              id="text"
              cols="30"
              rows="10"
              value={ text }
              onChange={ this.handleChange }
            />
            <button
              data-testid="submit-review-btn"
              type="submit"
            >
              Enviar avaliação
            </button>
            {validate && <p data-testid="error-msg">Campos inválidos</p>}
          </fieldset>
        </form>

        {allReviews.map((review, index) => (
          <fieldset key={ index }>
            <p data-testid="review-card-email">{review.email}</p>
            <p data-testid="review-card-rating">{review.rating}</p>
            <p data-testid="review-card-evaluation">{review.text}</p>
          </fieldset>
        ))}
      </section>
    );
  }
}

ProductRating.propTypes = {
  productId: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
