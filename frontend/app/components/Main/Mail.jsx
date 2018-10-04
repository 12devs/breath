import React, { Component } from 'react';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      code: "",
    };
    this.handleChange = this.handleChange.bind(this);

  }

  // componentDidMount() {
  //
  // }

  handleChange(key, value) {
    return this.setState({ [key]: value })
  }



  render() {
    return (
      <span>
        <input type="text" onChange={(event) => this.handleChange('email', event.target.value)}
               value={this.state.email}/>
        <input type="text" onChange={(event) => this.handleChange('code', event.target.value)}
               value={this.state.code}/>
        <a href={`city/${this.state.code}`}>get Info</a>
              </span>
    )
  }
}

export default Mail;
