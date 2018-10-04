import React, { Component } from 'react';
import services from '../../services';
import Mail from "./Mail";
import Cities from "./Cities";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
    this.getMainPageData = this.getMainPageData.bind(this);

  }

  componentDidMount() {
    this.getMainPageData()
  }

  getMainPageData() {
    return services.getMainPageData()
      .then(data => {
        console.log(data);
        this.setState({ cities: data })
      })
  }

  render() {
    return (
      <div>
        <div>Main</div>
        <Mail/>
        <Cities cities={this.state.cities}/>
      </div>
    )
  }
}

export default Main;
