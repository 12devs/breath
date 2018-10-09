import React, { Component } from 'react';
import figure from "./../../assets/img/figure.svg";

export default props => {
  if (!props.value && props.value !== 0) {
    return null
  }
  return (
    <div className="l-charts__item">
      <div className="l-charts__title">{props.title}</div>
      <img src={figure} alt=""/>
      <div className="l-charts__data">
        <div className="l-charts__data-ico"><img src={props.img} alt=""/></div>
        <div className="l-charts__data-number">{props.value}{props.unit}</div>
      </div>
    </div>
  );
};

