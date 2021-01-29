import React from "react";
import './CarouselNavigation.scss';

export default function CarouselNavigation(props) {
  return (
    <aside className="carousel-navigation">
      <ol className="carousel-navigation-list">
        {props.items.map((item, idx) => {
          return (
            <li className="carousel-navigation-item" key={item.order}>
              <button
                className={`carousel-navigation-button ${idx===props.active ? 'carousel-navigation-button-active' : ''}`}
                aria-label={`Go to Carousel Image ${item.order}`}
                onClick={() => props.selectSlide(item.order-1)}
              >
                {`Go to slide ${item.order}`}
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
