import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchAllProduct } from "../../queries/Queries";
import { cartActions } from "../../store/cart-slice";
import Slider from "../Slider/Slider";

import classes from "./Cart.module.css";

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      productList: null,
      totalPrice: 0,
    };
  }

  fetchData() {
    fetchAllProduct().then((data) => {
      this.setState({
        productList: data.data.categories[0].products[4],
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.fetchData();
    }
    if (
      prevProps.cartItem !== this.props.cartItem ||
      prevProps.currency !== this.props.currency
    ) {
      this.setState({
        totalPrice: this.props.cartItem.reduce((acummulator, total) => {
          return (
            acummulator +
            total.price[this.props.currency].amount * total.quantity
          );
        }, 0),
      });
    }
  }

  render() {
    const { productList, totalPrice } = this.state;
    const {
      cartItem,
      currency,
      totalQuantity,
      addToCartHandler,
      removeItemHandler,
    } = this.props;

    if (!productList) {
      return null;
    }

    return (
      <div className={classes.cart_container}>
        <p className={classes.cart_header}>
          My Bag,{" "}
          <span className={classes.items_cont}>
            {cartItem.length < 1 ? "0" : totalQuantity} items
          </span>
        </p>
        {cartItem.map((item, i) => (
          <div key={i}>
            <div className={classes.left_bar}>
              <p className={classes.item_name}>{item.name}</p>
              <p>{item.brand}</p>
              <p className={classes.item_price}>
                {item.price[currency].amount}
                {item.price[currency].currency.symbol}
              </p>
              {item.attributes.map((att, i) => (
                <p style={{ marginBottom: "5px", fontSize: "13px" }} key={i}>
                  {att.name}:{"  "}
                  {att.name == "Color" ? (
                    <span
                      style={{
                        background: att.value,
                        color: att.value,
                        borderRadius: "10px",
                        border: "1px solid grey",
                      }}
                    >
                      00
                    </span>
                  ) : (
                    <span>{att.value}</span>
                  )}
                </p>
              ))}
            </div>
            <div className={classes.right_bar}>
              <div className={classes.quantity__buttons}>
                <button
                  className={classes.btn__plus__minus}
                  onClick={() => addToCartHandler(item)}
                  style={{ marginRight: "15px" }}
                >
                  +
                </button>
                <p className={classes.quantity}>{item.quantity}</p>
                <button
                  className={classes.btn__plus__minus}
                  onClick={() => removeItemHandler(item)}
                >
                  -
                </button>
              </div>

              <Slider slides={item.gallery} width="130px" height="150px" />
            </div>
          </div>
        ))}
        <section className={classes.bottom_container}>
          <div className={classes.total}>
            <p className={classes.total_price_amount}>
              {cartItem.length < 1 ? "Your cart is empty" : "Total"}
            </p>
            <p className={classes.total_price_amount}>
              {cartItem.length > 0 && this.props.symbol[currency].symbol}
              {cartItem.length > 0 && totalPrice.toFixed(2)}
            </p>
          </div>
          <section className={classes.bottom_buttons}>
            <NavLink to={"/cart"}>
              <button className={classes.view_button}>VIEW BAG</button>
            </NavLink>
            {cartItem.length > 0 && (
              <button className={classes.checkout_button}>CHECK OUT</button>
            )}
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItem: state.cart.items,
  currency: state.currency.currency,
  symbol: state.currency.symbol,
  totalQuantity: state.cart.totalQuantity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartHandler: (item) =>
      dispatch(
        cartActions.addItemToCart({
          id: item.id,
          gallery: item.gallery,
          name: item.name,
          prices: item.prices,
          brand: item.brand,
          attributes: item.attributes,
        })
      ),
    removeItemHandler: (id) => dispatch(cartActions.removeItemFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
