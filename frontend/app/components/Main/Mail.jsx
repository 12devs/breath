import React, { Component } from 'react';
import wynd from "./../../assets/img/wynd.png";
import about from "./../../assets/img/about.png";
import wave_top from "./../../assets/img/wave_top.svg";

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { email, code, getCity, changeState } = this.props;
    return (
        <div className="l-hero__form"><img className="l-hero__form-img" src={about} alt="" srcSet=""/>
          <div className="l-hero__form-title">What is in the air you breathe?
            <div className="l-hero__form-grid">
              <div className="l-hero__form-item l-hero__form-item--50">
                <input className="c-input c-input--email" type="text" placeholder="yourmail@hellowynd.com"
                       onChange={(event) => changeState('email', event.target.value)} value={email}/>
              </div>
              <div className="l-hero__form-item l-hero__form-item--30">
                <input className="c-input c-input--zip" type="text" placeholder="zip code"
                       onChange={(event) => changeState('code', event.target.value)} value={code}/>
              </div>
              <div className="l-hero__form-item l-hero__form-item--20">
                <button className="c-button" onClick={() => getCity()}>Submit</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Mail;
