import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { filterActions } from "../../store/filter-slice";
import { cartActions } from "../../store/cart-slice";

import classes from "./Navbar.module.css";
import navlogo from "../../assets/navlogo.png";
import Vector from "../../assets/Vector.png";
import arrow from "../../assets/arrow.png";

import CurrencySwitcher from "../Dropdowns/CurrencySwitcher";
import Cart from "../Dropdowns/Cart";

class Navbar extends Component {
  constructor() {
    super();
    this.wrapperRef = React.createRef();
    this.wrapperRefCart = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickOutsideCart = this.handleClickOutsideCart.bind(this);

    this.state = {
      currencyDropdown: false,
      cartDropdown: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      this.setState({
        currencyDropdown: false,
      });
    }
  }
  currencyDropdownHandler = () => {
    this.setState({
      currencyDropdown: !this.state.currencyDropdown,
    });
  };

  cartDropdownHandler = () => {
    this.setState({
      cartDropdown: !this.state.cartDropdown,
    });
    this.props.opacityStateHandler(!this.props.opacity);
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsideCart);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("mousedown", this.handleClickOutsideCart);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ currencyDropdown: false });
    }
  }

  handleClickOutsideCart(event) {
    if (
      this.wrapperRefCart &&
      !this.wrapperRefCart.current.contains(event.target)
    ) {
      this.setState({ cartDropdown: false });
      this.props.opacityStateHandler(false);
    }
  }

  render() {
    const {
      filter,
      changeFilterStateHandler,
      symbol,
      currency,
      totalQuantity,
    } = this.props;
    const { currencyDropdown, cartDropdown } = this.state;

    return (
      <header className={classes.container}>
        <nav>
          <NavLink
            to={"/"}
            className={filter === 0 ? classes.active : undefined}
            onClick={() => changeFilterStateHandler(0)}
          >
            ALL
          </NavLink>
          <NavLink
            to={"/"}
            className={filter === 1 ? classes.active : undefined}
            onClick={() => changeFilterStateHandler(1)}
          >
            CLOTHES
          </NavLink>
          <NavLink
            to={"/"}
            className={filter === 2 ? classes.active : undefined}
            onClick={() => changeFilterStateHandler(2)}
          >
            TECH
          </NavLink>
        </nav>
        <section className={classes.logo}>
          <NavLink to={"/"}>
            <img src={navlogo} alt="not found" />
          </NavLink>
        </section>
        <div className={classes.right_menu}>
          <div className={classes.dropdown} ref={this.wrapperRef}>
            <button
              onClick={this.currencyDropdownHandler}
              className={classes.dropbtn}
            >
              {symbol && symbol[currency].symbol}
            </button>
            <img src={arrow} alt="not found" />
            <div
              className={classes.dropdown_content}
              style={{ display: currencyDropdown ? "block" : "none" }}
            >
              <CurrencySwitcher />
            </div>
          </div>
          <div className={classes.dropdown} ref={this.wrapperRefCart}>
            <button
              onClick={this.cartDropdownHandler}
              className={classes.dropbtn}
              style={{ paddingBottom: "2px" }}
              src={Vector}
            >
              <img src={Vector} />
              <div className={classes.badge}>
                <p style={{ paddingLeft: "1px" }}>{totalQuantity}</p>
              </div>
            </button>

            <div
              className={classes.dropdown_content_cart}
              style={{ display: cartDropdown ? "block" : "none" }}
            >
              <Cart />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter.filter,
  currency: state.currency.currency,
  symbol: state.currency.symbol,
  totalQuantity: state.cart.totalQuantity,
  opacity: state.cart.opacity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilterStateHandler: (val) =>
      dispatch(filterActions.switchFilterState(val)),
    opacityStateHandler: (value) =>
      dispatch(cartActions.opacityStateHandler(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
