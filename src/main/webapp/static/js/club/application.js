import React from 'react';
import Navbar from './view/nav/app'
// import Footer from './view/footer/app'
var Application=React.createClass({
	render(){
	return (
    <div className="application">
      <Navbar location={this.props.location} userid={this.props.params.userid}/>
      <div className="application-main">
       {this.props.children}
      </div>
    </div>
  );
	}
})

export default Application;