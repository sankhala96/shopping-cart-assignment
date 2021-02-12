import React, { Component } from "react";
import "./PLP.scss";
import { connect } from "react-redux";
import { fetchData, saveData, postData } from "../../actions/index";
import LeftPane from "../../components/LeftPane/LeftPane";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import * as Constants from "../../global-constants";
import DropDown from "../../components/DropDown/DropDown";

class PLP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      selectedCategory: props.selectedCategory,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.products !== state.products) {
      return { products: props.products };
    }

    if (props.categories !== state.categories) {
      return { categories: props.categories };
    }

    if (
      props.selectedCategory !== state.selectedCategory ||
      !state.selectedCategory
    ) {
      return { selectedCategory: props.selectedCategory };
    }

    return null;
  }

  componentDidMount() {
    this.props.fetchData(Constants.UrlProductsApi);
    this.props.fetchData(Constants.UrlCategoriesApi);
  }

  updateSelection = (selectedCategory) => {
    this.props.saveData(Constants.UrlSelectedCategory, selectedCategory);
  };

  addToCart = (product) => {
    const newCartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageURL: product.imageURL
    }
    const idx = product.id;
    const cartData = Object.assign({}, this.props.cart);

    if(!this.props.cart.hasOwnProperty(idx)){
      if(product.stock > 0) {
        newCartItem.stockLeft = product.stock - 1;
        newCartItem.quantity = 1;
        cartData[idx] = newCartItem;
        this.props.postData(Constants.UrlCartApi,cartData);
      }
    }
    else {
      if(this.props.cart[idx].stockLeft > 0) {
        newCartItem.stockLeft = this.props.cart[idx].stockLeft - 1;
        newCartItem.quantity = this.props.cart[idx].quantity + 1;
        cartData[idx] = newCartItem;

        this.props.postData(Constants.UrlCartApi,cartData);
      }
    }
  }

  render() {
    return (
      <main className="plp">
        {this.props.screenSize === Constants.ScreenLaptop ||
        this.props.screenSize === Constants.ScreenTablet ? (
          <LeftPane
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            updateSelectedCategory={this.updateSelection}
          />
        ) : (
          <DropDown
            categories={this.state.categories}
            selectedCategory={this.state.selectedCategory}
            updateSelectedCategory={this.updateSelection}
          />
        )}
        <ProductGrid
          products={
            this.props.selectedCategory && this.props.selectedCategory.id
              ? this.state.products.filter((product) => {
                  return product.category === this.props.selectedCategory.id;
                })
              : this.state.products
          }
          screenSize={this.props.screenSize}
          addToCart={this.addToCart}
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.setData.categories,
    products: state.setData.products,
    selectedCategory: state.setData.selectedCategory,
    cart: state.setData.cart,
    screenSize: state.setData.screenSize
  };
};

export default connect(mapStateToProps, { fetchData, saveData, postData })(PLP);
