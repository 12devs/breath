import React, { Component } from 'react';
import services from '../../services';
import Mail from "./Mail";
import Cities from "./Cities";

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
    const {src} = this.props;
    return (
      <div>
        <Mail email={src.email} code={src.code} getCity={this.props.getCity} changeState={this.props.changeState}/>
        {(()=>{
          if (src.error){
            return (<h3>{src.error}</h3>)
          }
        })()}
        <Cities cities={src.cities}/>
      </div>
    )
  }
}

export default Main;
