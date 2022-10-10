import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchCurrencySwitcher } from "../../queries/Queries";
import { currencyActions } from "../../store/currency-slice";

const Container = styled.div`
  background-color: white;
`;

const Currencies = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 200%;
  cursor: pointer;
  padding-top: 5px;
  padding-left: 20px;

  &:hover {
    background-color: #eeeeee;
  }
`;

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: [],
    };
  }

  componentDidMount() {
    fetchCurrencySwitcher().then((data) => {
      this.setState({
        currency: data.data.currencies,
      });
      this.setCurrencySymbol(data.data.currencies);
    });
  }

  setCurrencySymbol = (val) => {
    this.props.sendValue(val);
  };

  render() {
    const { currency } = this.state;
    const { currencyStateHandler } = this.props;

    return (
      <Container>
        {currency.map((curr, i) => (
          <Currencies onClick={() => currencyStateHandler(i)} key={curr.label}>
            {this.props.currency === i ? (
              <p style={{ color: "green" }}>
                {curr.symbol} {curr.label}
              </p>
            ) : (
              <p>
                {curr.symbol} {curr.label}
              </p>
            )}
          </Currencies>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
  symbol: state.currency.symbol,
});

const mapDispatchToProps = (dispatch) => {
  return {
    currencyStateHandler: (val) =>
      dispatch(currencyActions.switchCurrencyState(val)),
    sendValue: (val) => dispatch(currencyActions.currencySymbol(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
