import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import DOMPurify from "dompurify";

import { fetchSingleProduct } from "../../queries/Queries";
import { cartActions } from "../../store/cart-slice";

const Row = styled.div`
  padding: 100px;
`;

const LeftCol = styled.div`
  width: 15%;
  display: table-cell;
`;

const MainCol = styled.div`
  width: 70%;
  display: table-cell;
  vertical-align: top;
`;

const RightCol = styled.div`
  width: 15%;
  display: table-cell;
  vertical-align: top;
`;

const ImagePicker = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;
  margin-bottom: 10px;
  background: ${(props) => `url(${props.bg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const MainImage = styled.div`
  width: 600px;
  height: 600px;
  background: ${(props) => `url(${props.bg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ItemBrand = styled.div`
  font-weight: 600;
  font-size: 30px;
  padding-bottom: 10px;
`;

const ItemDescrp = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  margin-top: 50px;
  display: flex;
  justify-content: start;
`;

const PriceP = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  padding-top: 15px;
`;

const MainButtom = styled.button`
  margin-top: 40px;
  height: 52px;
  width: 370px;
  background: #5ece7b;
  border: none;
  font-weight: 600;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const DisButton = styled.button`
  opacity: 0.5;
  margin-top: 40px;
  height: 52px;
  width: 370px;
  background: #5ece7b;
  border: none;
  font-weight: 600;
  font-size: 16px;
  color: white;
  pointer-events: none;
`;

const ProdDesc = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 159.96%;
  margin-top: 30px;
`;

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      singleProduct: null,
      id: this.props.params.id,
      imageId: 0,
      attributes: [],
      selectedColor: "#44FF03",
    };
  }

  componentDidMount() {
    fetchSingleProduct(this.state.id).then((data) => {
      this.setState({
        singleProduct: data.data.product,
      });
    });
  }

  handleImageFn = (event) => {
    this.setState({ imageId: event });
  };

  addToCartFn = (event) => {
    event.preventDefault();
    let attributes = [];

    for (let i = 0; i < event.target.length - 1; i++) {
      attributes.push({
        name: event.target[i].title,
        value: event.target[i].value,
      });
    }

    this.setState(
      {
        items: {
          id: this.state.singleProduct.id,
          gallery: this.state.singleProduct.gallery,
          name: this.state.singleProduct.name,
          prices: this.state.singleProduct.prices,
          brand: this.state.singleProduct.brand,
          attributes: attributes,
          indexNum: this.state.indexNum,
        },
      },

      () => {
        this.props.addToCartHandler(this.state.items);
      }
    );
  };

  currentAttrs = (event) => {
    if (event.target.title == "Color") {
      this.setState({ selectedColor: event.target.value });
    }
  };

  render() {
    const { singleProduct, imageId } = this.state;
    const { currency, symbol } = this.props;

    if (!singleProduct) {
      return null;
    }

    return (
      <Row>
        <LeftCol>
          {singleProduct.gallery.map((item, i) => (
            <ImagePicker
              style={{
                opacity: this.state.imageId !== i ? "0.4" : "1",
              }}
              key={i}
              bg={item}
              alt="not found"
              onClick={() => this.handleImageFn(i)}
            />
          ))}
        </LeftCol>
        <MainCol>
          <MainImage bg={singleProduct.gallery[imageId]} alt="not found" />
        </MainCol>
        <RightCol>
          <ItemBrand>{singleProduct.brand}</ItemBrand>
          <h2>{singleProduct.name}</h2>
          <div>
            <form onSubmit={(event) => this.addToCartFn(event)}>
              {singleProduct.attributes.map((attribute, i) => (
                <ItemDescrp key={i}>
                  {attribute.name} :
                  <select
                    style={{
                      marginLeft: "10px",
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
                    onChange={(event) => this.currentAttrs(event)}
                    title={attribute.name}
                    value={attribute.value}
                  >
                    {attribute.items.map((item, i) => (
                      <option
                        style={{
                          fontWeight: "500px",
                          background: item.value,
                          color: item.value,
                        }}
                        key={i}
                        value={item.value}
                      >
                        {attribute.name == "Color" ? "" : item.id}
                      </option>
                    ))}
                  </select>
                </ItemDescrp>
              ))}
              <ItemDescrp>PRICE:</ItemDescrp>
              <PriceP>
                {symbol[currency].symbol}
                {singleProduct.prices[currency].amount}
              </PriceP>
              {singleProduct.inStock ? (
                <MainButtom type="submit">ADD TO CART</MainButtom>
              ) : (
                <DisButton type="disabled">OUT OF STOCK</DisButton>
              )}
            </form>
          </div>
          <ProdDesc
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(singleProduct.description),
            }}
          />
        </RightCol>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  symbol: state.currency.symbol,
  cartItem: state.cart.items,
});

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(SingleProduct));
