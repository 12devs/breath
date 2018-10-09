import React, { Component } from 'react';
import services from '../../services';
import Mail from "./Mail";
import Cities from "./Cities";
import wynd from "./../../assets/img/wynd.png";
import wave_top from "./../../assets/img/wave_top.svg";
import wave_bottom from "./../../assets/img/wave_bottom.svg";
import about from "./../../assets/img/about.svg";
import fb from "./../../assets/img/fb.png";
import tw from "./../../assets/img/tw.png";
import inst from "./../../assets/img/inst.png";
import Footer from "../footer";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMainPageData() {
    return services.getMainPageData()
      .then(data => {
        console.log(data);
        this.setState({ cities: data })
      })
  }

  render() {
    const { src } = this.props;
    console.log('main', this.props);
    return (
      <div className={"l-hero__scroll"}>
        <div className="l-hero">
          <a className="l-hero__logo" href="#"><img src={wynd} alt=""/></a>
          <nav>
            <button className="l-hero__hamburger hamburger hamburger--slider js-hamburger">
              <span className="hamburger-box"><span className="hamburger-inner"></span></span>
            </button>
            <div className="l-hero__navigation">
              <div className="l-hero__navigation-container"><a className="l-hero__navigation-url" href="">Home</a>
                <a className="l-hero__navigation-url" href="">Description</a>
              </div>
            </div>
          </nav>
          <Mail email={src.email} code={src.code} getCity={this.props.getCity} changeState={this.props.changeState}/>
          {(() => {
            if (src.error) {
              return (<h3>{src.error}</h3>)
            }
          })()}

        </div>
        <img className="l-hero__wave" src={wave_top} alt=""/>
        <Cities cities={src.cities} getCity={this.props.getCity} changeState={this.props.changeState}/>

        <div className="l-footer">
          <img className="l-footer__wave" src={wave_bottom} alt=""/>
          <div className="l-footer__description">
            <div className="l-footer__quote"><img className="l-footer__description-img" src={about} alt="" srcSet=""/>
              <div className="l-footer__quote-text">If you don't like what you see and want to learn more visit us at
              </div>
              <a className="l-footer__quote-site" href="">hellowynd.com</a>
            </div>
          </div>
          <div className="l-footer__nav">
            <div className="l-footer__nav-grid">
              <div className="l-footer__nav-item">
                <div className="l-footer__nav-title">Product</div>
                <a className="l-footer__nav-url" href="">How it works</a>
                <a className="l-footer__nav-url" href="">Benefits</a>
                <a className="l-footer__nav-url" href="">Features</a>
              </div>
              <div className="l-footer__nav-item">
                <div className="l-footer__nav-title">Support</div>
                <a className="l-footer__nav-url" href="">Blog</a><a className="l-footer__nav-url" href="">Help</a>
                <a className="l-footer__nav-url" href="">FAQ</a>
              </div>
              <div className="l-footer__nav-item">
                <div className="l-footer__nav-title">About us</div>
                <a className="l-footer__nav-url" href="">Our Team</a><a className="l-footer__nav-url" href="">Career</a>
                <a className="l-footer__nav-url" href="">Press</a>
              </div>
              <div className="l-footer__nav-item">
                <div className="l-footer__nav-title">Contact</div>
                <a className="l-footer__nav-url" href="">info@hellowynd.com</a>
                <a className="l-footer__nav-url" href="">111-000-0000</a>
              </div>
            </div>
          </div>
          <div className="l-footer__social">
            <a className="l-footer__social-url" href="">
              <img src={fb} alt=""/>
            </a>
            <a className="l-footer__social-url" href=""><img src={tw} alt=""/>
            </a>
            <a className="l-footer__social-url" href=""><img src={inst} alt=""/>
            </a>
          </div>
          <div className="l-footer__copyright">2018 - Hellowynd. All right reserved.</div>
        </div>

      </div>
    )
  }
}

export default Main;
