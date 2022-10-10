import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ProductList from "./ProductList";

import { fetchAllProduct } from "../../queries/Queries";

const Container = styled.div`
  padding: 5%;
`;

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: null,
    };
  }

  fetchData() {
    fetchAllProduct().then((data) => {
      this.setState({
        productList: data.data.categories[this.props.filter].products,
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  render() {
    const { productList } = this.state;

    if (!productList) {
      return null;
    }

    return (
      <Container>
        {productList.map((product) => (
          <ProductList
            key={product.id}
            name={product.name}
            prices={product.prices}
            id={product.id}
            gallery={product.gallery}
            attributes={product.attributes}
            item={product}
            brand={product.brand}
          />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter.filter,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(MainPage);
