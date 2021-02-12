import React from "react";
import "./GridItem.scss";
import PinkButton from "../Buttons/PinkButton";
import * as Constants from "../../global-constants";

export default function GridItem(props) {
  const product = props.product;
  return (
    <figure className="griditem" tabIndex='0'>
      <figcaption className="griditem-heading">{product.name}</figcaption>
      <div className="griditem-container">
        <img
            src={Constants.UrlPublic + product.imageURL}
            alt={product.name}
            srcSet={Constants.UrlPublic + product.imageURL + " 300w"}
            sizes={Constants.MaxViewportWidth}
            className="griditem-container-image"
          />
        <div className="griditem-container-description">{product.description}</div>
        <div className="griditem-container-footer">
          {props.screenSize === Constants.ScreenLaptop && (
            <span className="griditem-container-footer-text">
              {Constants.MRP} {Constants.INR}
              {product.price}
            </span>
          )}
          <div className="griditem-container-footer-button">
            {props.screenSize === Constants.ScreenLaptop ? (
              <PinkButton
                className="griditem-container-footer-pinkbutton"
                ariaLabel={Constants.BuyNow + product.name + Constants.SignAt + Constants.INR + product.price}
                handleClick={() => props.selectGridItem(product)}
              >
                {Constants.BuyNow}
              </PinkButton>
            ) : (
              <PinkButton
                className="griditem-container-footer-pinkbutton"
                handleClick={() => props.selectGridItem(product)}
              >
                { Constants.BuyNow + " " + Constants.SignAt + " " + Constants.INR + product.price }
              </PinkButton>
            )}
          </div>
        </div>
      </div>
    </figure>
  );
}
