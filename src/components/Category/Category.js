import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.section`
  padding: 2% 8% 2% 8%;
  font-weight: 400;
  font-size: 40px;
`;

class Category extends Component {
  render() {
    const { filter, opacity } = this.props;

    return (
      <Container
        style={{
          opacity: opacity ? "0.4" : "1",
        }}
      >
        {filter === 0 && "ALL"}
        {filter === 1 && "CLOTHES"}
        {filter === 2 && "TECH"}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter.filter,
    opacity: state.cart.opacity,
  };
};

export default connect(mapStateToProps)(Category);
