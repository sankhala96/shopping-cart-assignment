import React, { useState } from 'react';
import './DropDown.scss';
import PinkButton from '../Buttons/PinkButton';
import * as Constants from '../../global-constants';

export default function DropDown(props) {
    const selectedCategory = props.selectedCategory;
    const [selectedItem, updateSelectedItem] = useState(selectedCategory)
    const [show, setShow] = useState(false)

    const toggle = () => {
        setShow(!show);
    }

    const handleCategoryClick = (category) => {
        updateSelectedItem(category)
        setShow(false);
        props.updateSelectedCategory(category)
    }

    return (
        <div className="dropdown">
            <PinkButton
                className="dropdown-pinkbutton"
                handleClick={toggle}
            >
                {(selectedItem && selectedItem !== {} && selectedItem.name ? selectedItem.name : Constants.SelectCategory)}
            </PinkButton>
            {props.categories.length && show && (
                <ul>
                    {props.categories.map((category,idx) => {
                        return (
                            <li key={idx}>
                                <button onClick={() => handleCategoryClick(category)}> {category.name} </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
