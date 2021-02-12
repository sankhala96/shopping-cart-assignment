import React, { Component } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import { fetchData, saveData } from "../../actions/index";
import Carousel from "../../components/Carousel/Carousel";
import Category from '../../components/Category/Category';
import * as Constants from "../../global-constants";

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            banners: [],
            categories: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.banners.length !== state.banners.length) {
            return { banners: props.banners }
        }

        if(props.categories.length !== state.categories.length) {
            return { categories: props.categories }
        }

        return null;
    }

    componentDidMount() {
        this.props.fetchData(Constants.UrlBannersApi);
        this.props.fetchData(Constants.UrlCategoriesApi);
    }

    onSelectCategory = (selectedCategory) => {
        this.props.saveData(Constants.UrlSelectedCategory, selectedCategory);
        this.props.history.push(`/${Constants.UrlPlp}`);
    }

    render() {
        return (
            <div className="home">
                <Carousel items={this.state.banners} screenSize={this.props.screenSize} />
                <div className="home-container">
                    {this.state.categories.map((category, idx) => 
                        {
                            return(
                                <Category 
                                    key={category+idx}
                                    category={category}
                                    imgAlign={(idx % 2) ? Constants.Right : Constants.Left}
                                    handleClick={ this.onSelectCategory }
                                />
                            )
                        }
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.setData.categories,
        banners: state.setData.banners,
        cart: state.setData.cart,
        screenSize: state.setData.screenSize
    }
}

export default connect(mapStateToProps, { fetchData, saveData })(Home)