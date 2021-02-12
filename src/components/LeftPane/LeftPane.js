import React from "react";
import "./LeftPane.scss";

export default function LeftPane(props) {
  return (
    <div className="left-pane">
      <ul>
        {props.categories.map((cat) => {
          return (
            <li
              key={cat.id}
              className={
                cat.id === props.selectedCategory.id ? "selected-item" : ""
              }
            >
              <button onClick={() => props.updateSelectedCategory(cat)}>{cat.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
