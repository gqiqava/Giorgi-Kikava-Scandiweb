import React, { Component } from "react";

import Category from "../Category/Category";
import ProductListFetch from "./ProductListFetch";

export class MainPage extends Component {
  render() {
    return (
      <div>
        <Category />
        <ProductListFetch />
      </div>
    );
  }
}

export default MainPage;
