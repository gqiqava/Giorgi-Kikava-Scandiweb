import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import styled from "styled-components";

import Slider from "../Slider/Slider";

const Container = styled.div`
  background-color: #ffffff;
  margin-left: 5%;
`;

const CartText = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  margin: 80px 120px;
`;

const Wrapper = styled.div`
  margin-left: 100px;
  width: 70%;
  padding: 20px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

const ItemName = styled.p`
  font-weight: 400;
  font-size: 25px;
`;

const Qty = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 24px;
  margin-right: 25px;
`;

const ItemBrand = styled.p`
  font-weight: 500;
  font-size: 24px;
  margin-right: 25px;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  font-size: 20px;
`;

const QtyButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeftCol = styled.div`
  height: 185px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightCol = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CartEmpty = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;

const PlusMinusButt = styled.button`
  width: 45px;
  height: 45px;
  background-color: transparent;
  color: black;
  border: 1px solid #1d1f22;
  margin-right: 25px;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    background: #1d1f22;
    color: white;
    transition: 0.1s all ease-in-out;
    font-size: 130%;
  }
`;

const TotalCont = styled.div`
  margin: 3px 100px;
  padding: 20px;
  font-weight: 500;
  font-size: 22px;
`;

const OrderButton = styled.button`
  width: 280px;
  height: 43px;
  background-color: #5ece7b;
  color: white;
  border: none;
  font-weight: 600, Semi Bold;
`;

export class CartPage extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.setState({
      totalPrice: this.props.cartItem.reduce((acummulator, total) => {
        return (
          acummulator + total.price[this.props.currency].amount * total.quantity
        );
      }, 0),
    });
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
    const { totalPrice } = this.state;
    const {
      cartItem,
      currency,
      totalQuantity,
      addToCartHandler,
      removeItemHandler,
    } = this.props;

    if (cartItem.length === 0) {
      return <CartEmpty>Your cart is empty</CartEmpty>;
    }

    return (
      <Container>
        <CartText>CART</CartText>
        {cartItem.length !== 0 &&
          cartItem.map((item, i) => (
            <Wrapper key={i}>
              <LeftCol>
                <ItemBrand>{item.brand}</ItemBrand>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>
                  {item.quantity > 1 && (
                    <p style={{ marginBottom: "15px", fontWeight: "300" }}>
                      {item.quantity} x {item.price[currency].currency.symbol}
                      {item.price[currency].amount}
                    </p>
                  )}
                  {item.price[currency].currency.symbol}
                  {parseFloat(
                    item.quantity * item.price[currency].amount
                  ).toFixed(2)}
                </ItemPrice>
                <div>
                  {item.attributes.map((item, i) => (
                    <p
                      style={{
                        marginRight: "10px",
                        fontWeight: "500",
                        marginBottom: "7px",
                      }}
                      key={i}
                    >
                      {item.name}:{"  "}
                      {item.name == "Color" ? (
                        <span
                          style={{
                            background: item.value,
                            color: item.value,
                            borderRadius: "10px",
                            border: "1px solid grey",
                          }}
                        >
                          00
                        </span>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </p>
                  ))}
                </div>
              </LeftCol>
              <RightCol>
                <QtyButtons>
                  <PlusMinusButt
                    onClick={() => addToCartHandler(item)}
                    type="submit"
                  >
                    +
                  </PlusMinusButt>
                  <Qty>{item.quantity}</Qty>
                  <PlusMinusButt
                    onClick={() => removeItemHandler(item)}
                    type="submit"
                  >
                    -
                  </PlusMinusButt>
                </QtyButtons>
                <Slider slides={item.gallery} height="185px" width="170px" />
              </RightCol>
            </Wrapper>
          ))}
        <TotalCont>
          <div style={{ marginBottom: "10px" }}>
            Qty: <span>{totalQuantity}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            Total: {this.props.symbol[currency].symbol}
            {totalPrice.toFixed(2)}
          </div>
          <OrderButton>ORDER</OrderButton>
        </TotalCont>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
