import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import { postData } from "../../actions/index";
import CartItem from "../CartItem/CartItem";
import PinkButton from '../Buttons/PinkButton';
import * as Constants from "../../global-constants";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: props.cart,
      closeCartTabIndex: '-1'
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.cart !== state.cart) {
      return {
        cart: props.cart,
      };
    }

    return null;
  }

  addQuantity = (productToAdd) => {
    if (productToAdd.stockLeft > 0) {
      const updateCartItem = {
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        imageURL: productToAdd.imageURL,
        stockLeft: productToAdd.stockLeft - 1,
        quantity: productToAdd.quantity + 1,
      };
      const cartData = Object.assign({}, this.state.cart);
      cartData[productToAdd.id] = updateCartItem;

      this.props.postData(Constants.UrlCartApi, cartData);
    }
  };

  reduceQuantity = (productToReduce) => {
    if (productToReduce.quantity > 1) {
      const updateCartItem = {
        id: productToReduce.id,
        name: productToReduce.name,
        price: productToReduce.price,
        imageURL: productToReduce.imageURL,
        stockLeft: productToReduce.stockLeft + 1,
        quantity: productToReduce.quantity - 1,
      };
      const cartData = Object.assign({}, this.state.cart);
      cartData[productToReduce.id] = updateCartItem;

      this.props.postData(Constants.UrlCartApi, cartData);
    } else {
      const cartData = Object.assign({}, this.state.cart);
      delete cartData[productToReduce.id];

      this.props.postData(Constants.UrlCartApi, cartData);
    }
  };

  render() {
    const cartKeys = Object.keys(this.state.cart);
    const totalItems = cartKeys.reduce(
      (totalItems, cartItem) => this.props.cart[cartItem].quantity + totalItems,
      0
    );
    const totatlPrice = cartKeys.reduce(
      (totalAmount, cartItem) =>
        this.props.cart[cartItem].price * this.props.cart[cartItem].quantity +
        totalAmount,
      0
    );
    return (
      <main className="cart" tabIndex="0">
        <div className="cart-header">
          <div>
            <span className="cart-header-my-cart">{Constants.MyCart}</span>
            {totalItems > 0 && (
              <span className="cart-header-total-item">
                ({totalItems}{" "}
                {totalItems >= 1 ? Constants.Item : Constants.Item + "s"})
              </span>
            )}
          </div>
          {this.props.screenSize === Constants.ScreenLaptop && <span
            className="cart-header-icon-close"
            onClick={this.props.closeCart}
            tabIndex={this.state.closeCartTabIndex}
          >
            &#10006;
          </span>}
        </div>
        {cartKeys.length > 0 ? (
          <div className="cart-content">
            {cartKeys.map((PID) => {
              return (
                <CartItem
                  key={PID}
                  cartItem={this.state.cart[PID]}
                  addQuantity={this.addQuantity}
                  reduceQuantity={this.reduceQuantity}
                />
              );
            })}
            <figure className="cart-figure">
              <img
                src={Constants.UrlPublic + Constants.ImgLowestPrice}
                srcSet={
                  Constants.UrlPublic + Constants.ImgLowestPrice + " 300w"
                }
                sizes={
                  "(" +
                  Constants.MinWidth +
                  Constants.ScreenLaptop +
                  ") 20vw, " +
                  "(" +
                  Constants.MinWidth +
                  Constants.ScreenTablet +
                  ") 30vw, " +
                  " 50vw"
                }
                alt={Constants.LowestPriceGuaranteed}
              />
              <figcaption className="cart-text-small">
                {Constants.LowestPrice}
              </figcaption>
            </figure>
          </div>
        ) : (
          <div className="cart-content cart-content-empty">
            <div className="cart-text-large">{Constants.CartEmpty}</div>
            <div className="cart-text-small">{Constants.CartEmptyFavItems}</div>
          </div>
        )}
        <div
          className={`cart-footer ${
            cartKeys.length > 0 ? "cart-footer-border" : ""
          }`}
        >
          {cartKeys.length > 0 && (
            <div className="cart-text-small cart-text-padding">
              {Constants.PromoCode}
            </div>
          )}
          <PinkButton
            className='cart-pinkbutton button-pink--space-between' 
            handleClick={this.cartSubmit}
            ariaLabel={(cartKeys.length > 0)
              ? Constants.TotalCartValue + Constants.INR + totatlPrice + '. ' + Constants.Checkout + '.'
              : ''}
              handleFocus={() => this.setState({closeCartTabIndex: '0'})}
            >
              <span>{(cartKeys.length > 0) ? Constants.Checkout : Constants.StartShopping}</span>
              {(cartKeys.length > 0) && <span>{Constants.INR + totatlPrice + ' ' + Constants.SignRightArrow}</span>}
            </PinkButton>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.setData.cart,
    screenSize: state.setData.screenSize
  };
};

export default connect(mapStateToProps, { postData })(Cart);
