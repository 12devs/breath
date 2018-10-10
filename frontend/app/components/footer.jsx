import React, { Component } from 'react';
import fb from "./../assets/img/fb.png";
import tw from "./../assets/img/tw.png";
import inst from "./../assets/img/inst.png";
import figure from "./../assets/img/figure.svg";

export default () => {
  return (
    <div className="l-footer">
      <div className="l-footer__nav">
        <div className="l-footer__nav-grid">
          <div className="l-footer__nav-item">
            <div className="l-footer__nav-title" style={{backgroundImage: `url(${figure})`}}>Product
            </div>
            <a className="l-footer__nav-url" href="">How it works</a>
            <a className="l-footer__nav-url" href="">Benefits</a>
            <a className="l-footer__nav-url" href="">Features</a>
          </div>
          <div className="l-footer__nav-item">
            <div className="l-footer__nav-title" style={{backgroundImage: `url(${figure})`}}>Support
            </div>
            <a className="l-footer__nav-url" href="">Blog</a><a className="l-footer__nav-url" href="">Help</a>
            <a className="l-footer__nav-url" href="">FAQ</a>
          </div>
          <div className="l-footer__nav-item">
            <div className="l-footer__nav-title" style={{backgroundImage: `url(${figure})`}}>About us
            </div>
            <a className="l-footer__nav-url" href="">Our Team</a><a className="l-footer__nav-url" href="">Career</a>
            <a className="l-footer__nav-url" href="">Press</a>
          </div>
          <div className="l-footer__nav-item">
            <div className="l-footer__nav-title" style={{backgroundImage: `url(${figure})`}}>Contact
            </div>
            <a className="l-footer__nav-url" href="">info@hellowynd.com</a>
            <a className="l-footer__nav-url" href="">111-000-0000</a>
          </div>
        </div>
      </div>
      <div className="l-footer__social">
        <a className="l-footer__social-url" href=""><img src={fb} alt=""/></a>
        <a className="l-footer__social-url" href=""><img src={tw} alt=""/></a>
        <a className="l-footer__social-url" href=""><img src={inst} alt=""/>
        </a>
      </div>
      <div className="l-footer__copyright" style={{backgroundImage: `url(${figure})`}}>© 2018
        – &nbsp;<span className="l-footer__copyright l-footer__copyright--turquoise">Hellowynd</span>. All right
        reserved.
      </div>
    </div>
  );
};

