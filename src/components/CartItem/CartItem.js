import React from "react";
import './CartItem.scss';
import PinkButton from '../Buttons/PinkButton';
import * as Constants from "../../global-constants";

export default function CartItem(props) {
  return (
    <figure className="cartitem" tabIndex="0">
      <div className="cartitem-image">
        <img
          src={Constants.UrlPublic + props.cartItem.imageURL}
          srcSet={Constants.UrlPublic + props.cartItem.imageURL + " 300w"}
          sizes={
            "(" +
            Constants.MinWidth +
            Constants.ScreenLaptop +
            ") 5vw, " +
            "(" +
            Constants.MinWidth +
            Constants.ScreenTablet +
            ") 8vw, " +
            " 15vw"
          }
          alt={props.cartItem.name}
        />
      </div>
      <div className="cartitem-content">
        <figcaption className="cartitem-heading">
          {props.cartItem.name}
        </figcaption>
        <div className="cartitem-quantity">
          <PinkButton
            className="cartitem-pinkbutton"
            text={Constants.SignMinus}
            handleClick={() => props.reduceQuantity(props.cartItem)}
            ariaLabel={Constants.ReduceQuantity}
          />
          <span>{props.cartItem.quantity}</span>
          <PinkButton
            className="cartitem-pinkbutton"
            text={Constants.SignPlus}
            handleClick={() => props.addQuantity(props.cartItem)}
            ariaLabel={Constants.IncreaseQuantity}
          />
          <span>{Constants.SignMultiply}</span>
          <span>{Constants.INR + props.cartItem.price}</span>
        </div>
      </div>
        <div className="cartitem-totalprice">
            {Constants.INR}
            {props.cartItem.price * props.cartItem.quantity}
        </div>
    </figure>
  );
}
