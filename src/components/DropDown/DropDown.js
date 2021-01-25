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
                text={(selectedItem && selectedItem !== {} && selectedItem.name ? selectedItem.name : Constants.SelectCategory)}
                handleClick={toggle}
            />
            {props.categories.length && show && (
                <ul>
                    {props.categories.map((category,idx) => {
                        return (
                            <li key={idx} onClick={() => handleCategoryClick(category)}>
                                {category.name}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
