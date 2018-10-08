import React, { Component } from 'react';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { email, code, getCity, changeState } = this.props;
    return (
      <div>
      <span>
        <input type="text" onChange={(event) => changeState('email', event.target.value)}
               value={email}/>
        <input type="text" onChange={(event) => changeState('code', event.target.value)}
               value={code}/>
        <input type="button" onClick={() => getCity()}
               value={'Get Info'}/>
      </span>
      </div>)
  }
}

export default Mail;
