import React from 'react';
import './Category.scss';
import PinkButton from '../Buttons/PinkButton';
import * as Constants from '../../global-constants';

export default function Category(props) {
    return (
      <div className="category">
        {props.imgAlign === Constants.Left && (
          <img
            src={`public${props.category.imageUrl}`}
            alt={props.category.name}
            className="category-img"
          />
        )}
        <div className="category-dec">
          <h3>{props.category.name}</h3>
          <p>{props.category.description}</p>
          <PinkButton handleClick={() => props.handleClick(props.category)} >
            {'Explore ' + props.category.key}
          </PinkButton>
        </div>
        {props.imgAlign === Constants.Right &&
        <img src={Constants.UrlPublic + props.category.imageUrl}
          alt={props.category.name}
          className="category-img"
        />
          }
      </div>
    );
}
