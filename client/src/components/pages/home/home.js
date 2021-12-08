import React, { Component } from "react";
import Header from "../header";
import AboutUs from "../aboutus";
import Products from "../products";
import News from "../news";
import Contact from "../contact";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <AboutUs />
        <Products />
        <News />
        <Contact />
      </div>
    );
  }
}
