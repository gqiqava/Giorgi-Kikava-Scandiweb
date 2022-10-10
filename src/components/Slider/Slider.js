import React, { Component } from "react";
import styled from "styled-components";

import classes from "./Slider.module.css";
import SliderArrow from "../../assets/SliderArrow.png";
import SliderArrow1 from "../../assets/SliderArrow1.png";

const SlideImage = styled.div`
  background: ${(props) => `url(${props.bg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  z-index: 10;
  cursor: pointer;
  user-select: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.35);
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const Rarrow = styled.div`
  position: absolute;
  top: 80%;
  right: 10px;
  width: 21px;
  height: 21px;
  padding: 3px 0px;
  background-color: rgba(0, 0, 0, 0.35);

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
  }
`;

const Larrow = styled.div`
  position: absolute;
  top: 80%;
  right: 38px;
  width: 21px;
  height: 21px;
  padding: 3px 0px;
  background-color: rgba(0, 0, 0, 0.35);

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
  }
`;

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: props.slides.length,
    };
  }

  nextSlide = () => {
    this.setState({
      current:
        this.state.current === this.state.length - 1
          ? 0
          : this.state.current + 1,
    });
  };

  prevSlide = () => {
    this.setState({
      current:
        this.state.current === 0
          ? this.state.length - 1
          : this.state.current - 1,
    });
  };

  render() {
    const { length, current } = this.state;
    const { slides, height, width } = this.props;

    if (!Array.isArray(slides) || length <= 0) {
      return null;
    }

    return (
      <section
        style={{
          height: height,
          width: width,
          position: "relative",
        }}
      >
        {length > 1 && (
          <Wrapper>
            <Larrow onClick={this.prevSlide}>
              <img src={SliderArrow1} alt="not found" />
            </Larrow>

            <Rarrow onClick={this.nextSlide}>
              <img src={SliderArrow} alt="not found" />
            </Rarrow>
          </Wrapper>
        )}
        {slides.map((slide, index) => {
          return (
            <div
              className={
                index === current ? classes.slide.active : classes.slide
              }
              key={index}
            >
              {index === current && (
                <SlideImage
                  bg={slide}
                  alt="not found"
                  style={{ height: height, width: width }}
                />
              )}
            </div>
          );
        })}
      </section>
    );
  }
}

export default Slider;
