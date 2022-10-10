import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import emptycart from "../../assets/emptycart.png";

import { cartActions } from "../../store/cart-slice";

const Column = styled.div`
  float: left;
  width: 25%;
  padding: 0 10px;
  display: flex;
  margin-bottom: 100px;

  @media screen and (max-width: 600px) {
    width: 100%;
    display: block;
    margin-bottom: 30px;
  }

  @media screen and (min-width: 600px) and (max-width: 700px) {
    width: 50%;
    display: block;
    margin-bottom: 20px;
  }
`;

const Card = styled.div`
  padding: 15px;
  margin: 0px 10px 0px 10px;
  width: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: 0 10px 18px 0 rgba(0, 0, 0, 0.3);
    transition: 0.3s;
  }
`;

const CardImage = styled.div`
  height: 300px;
  padding: 20px;
  background: ${(props) => `url(${props.bg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const DescrContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const AttrContainer = styled.div`
  display: flex;
  justify-content: start;
`;

const AttrPar = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  font-size: 13px;
  margin-right: 20px;
`;

const CartDiv = styled.div`
  position: absolute;
  background-color: #5ece7b;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  bottom: 20%;
  right: 5%;
`;

const OutOfStock = styled.p`
  position: relative;
  top: 150px;
  font-weight: 500;
  font-size: 24px;
  left: 15%;
`;

const CartButton = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CartIcon = styled.img`
  width: 25px;
  padding-top: 4px;
  padding-right: 2px;
`;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartVisibility: false,
      selectedColor: "transparent",
    };
  }

  fn = (event, val) => {
    event.preventDefault();

    let attributes = [];

    for (let i = 0; i < event.target.length - 1; i++) {
      attributes.push({
        name: event.target[i].title,
        value: event.target[i].value,
      });
    }

    let item = {
      id: val.id,
      gallery: val.gallery,
      name: val.name,
      prices: val.prices,
      brand: val.brand,
      attributes: attributes,
    };

    this.props.addToCartHandler(item);
  };

  toggleCartVisibilityOn = () => this.setState({ cartVisibility: true });
  toggleCartVisibilityOff = () => this.setState({ cartVisibility: false });

  componentDidMount() {
    let stColor = this.props.item.attributes.find((att) => att.id === "Color");
    if (stColor) {
      this.setState({ selectedColor: stColor.items[0].value });
    }
  }

  currentAttrs = (name, event) => {
    if (name == "Color") {
      this.setState({ selectedColor: event.target.value });
    }
  };

  render() {
    const { currency, id, gallery, name, prices, attributes, item, opacity } =
      this.props;

    const cartButton = item.inStock && this.state.cartVisibility && (
      <CartDiv>
        <CartButton type="submit">
          <CartIcon src={emptycart} alt="not found" />
        </CartButton>
      </CartDiv>
    );

    return (
      <Column
        style={{
          opacity: opacity ? "0.4" : "1",
        }}
      >
        <Card
          style={{ opacity: item.inStock ? "1" : "0.5" }}
          onMouseEnter={this.toggleCartVisibilityOn}
          onMouseLeave={this.toggleCartVisibilityOff}
        >
          <NavLink
            style={{ padding: "0px", margin: "0px" }}
            to={`/product/${id}`}
          >
            {!item.inStock && <OutOfStock>OUT OF STOCK</OutOfStock>}
            <CardImage bg={gallery[0]}></CardImage>
          </NavLink>
          <DescrContainer>
            <p style={{ marginTop: "10px" }}>{name}</p>
            <p style={{ fontWeight: 500 }}>
              {prices[currency].currency.symbol}
              {prices[currency].amount}
            </p>
            <AttrContainer>
              <form
                onSubmit={(event) => {
                  this.fn(event, item);
                }}
              >
                {attributes.map((attribute, i) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      marginTop: "8px",
                    }}
                    key={i}
                  >
                    <AttrPar>
                      <p> {attribute.name} </p>
                    </AttrPar>
                    <select
                      style={{
                        padding: "2px",
                        borderRadius: "7px",
                        background:
                          attribute.name == "Color"
                            ? this.state.selectedColor
                            : "transparent",
                        color:
                          attribute.name == "Color" &&
                          this.state.selectedColor == "Black"
                            ? "white"
                            : "black",
                        border: "none",
                      }}
                      onChange={(event) =>
                        this.currentAttrs(attribute.name, event)
                      }
                      title={attribute.name}
                    >
                      {attribute.items.map((el, i) => (
                        <option
                          style={{
                            fontWeight: "500px",
                            background: el.value,
                            color: el.value,
                          }}
                          key={i}
                          value={el.value}
                        >
                          {attribute.name == "Color" ? "" : el.id}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {cartButton}
              </form>
            </AttrContainer>
          </DescrContainer>
        </Card>
      </Column>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter.filter,
  currency: state.currency.currency,
  opacity: state.cart.opacity,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartHandler: (val) =>
      dispatch(
        cartActions.addItemToCart({
          id: val.id,
          gallery: val.gallery,
          name: val.name,
          prices: val.prices,
          brand: val.brand,
          attributes: val.attributes,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
