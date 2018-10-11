import React, { Component } from 'react';
import about from "./../../assets/img/about.png";
import services from "../../services";

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.breathEmail || '',
      code: localStorage.breathCode || '',
      error: "",
      preloader: false
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  saveEmail() {
    const { email, code } = this.state;
    return this.changeState('preloader', true)
      .then(()=>{
        return services.saveEmail(email, code)
      })
      .then(data => {
        if (data.error) {
          return this.setState({ error: data.error, preloader: false })
        } else {
          localStorage.setItem('breathCode', code);
          localStorage.setItem('breathEmail', email);
          location.assign('/');
        }
      })
  }

  changeState(key, value) {
    return new Promise((resolve) => {
      this.setState({ [key]: value }, () => {
        resolve(true)
      })
    })
  }

  render() {
    const { email, code, error } = this.state;
    return (
      <div className="l-hero__form"><img className="l-hero__form-img" src={about} alt="" srcSet=""/>
        <div className="l-hero__form-title">What is in the air you breathe?
          <div className="l-hero__form-grid">
            <div className="l-hero__form-item l-hero__form-item--50">
              <input className="c-input c-input--email" type="text" placeholder="yourmail@hellowynd.com"
                     onChange={(event) => this.setState({ email: event.target.value })} value={email}/>
            </div>
            <div className="l-hero__form-item l-hero__form-item--30">
              <input className="c-input c-input--zip" type="text" placeholder="zip code"
                     onChange={(event) => this.setState({ code: event.target.value })} value={code}/>
            </div>
            <div className="l-hero__form-item l-hero__form-item--20">
              <button className="c-button" onClick={this.saveEmail}>Submit</button>
            </div>
          </div>
          {error}
        </div>
      </div>
    )
  }
}

export default Mail;
