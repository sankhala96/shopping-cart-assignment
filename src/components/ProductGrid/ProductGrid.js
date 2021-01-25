import React from 'react';
import './ProductGrid.scss';
import GridItem from '../GridItem/GridItem'
import * as Constants from '../../global-constants';

export default function ProductGrid(props) {
    return (
        <div className="grid">
           {props.products.length > 0 ?
            props.products.map((prod,idx) => {
                return(
                    <GridItem key={idx} product={prod} screenSize={props.screenSize} selectGridItem={props.addToCart} />
                )
            })
            : <p>{Constants.NoAvailableProducts}</p>
           } 
        </div>
    )
}
