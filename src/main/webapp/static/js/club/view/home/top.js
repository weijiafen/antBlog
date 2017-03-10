import React from 'react';
import {Row , Col ,} from 'antd'
let App=React.createClass({
	
	render(){
		let bgimg={
			backgroundImage:`url(${this.props.data.background_img})`
		}
		let introduce={__html:this.props.data.introduce}
		debugger
		return (<section className="section_top" style={bgimg}>
			<Row>
				<Col xs={0} sm={0} md={3} lg={4}></Col>
				<Col xs={24} sm={24} md={18} lg={16}>
					<Row>
						<Col xs={6} sm={6} md={8} lg={8}></Col>
						<Col xs={12} sm={12} md={8} lg={8}>
							<img src={this.props.data.img} className="wow pulse animated animated" />
						</Col>
						<Col xs={6} sm={6} md={8} lg={8}></Col>
					</Row>
					<h2 className="wow fadeInDown animated animated">{this.props.data.name}</h2>
					<p className="wow fadeInDown animated animated" dangerouslySetInnerHTML={introduce} /> 
				</Col>
				<Col xs={0} sm={0} md={3} lg={4}></Col>
			</Row>
		  </section>);
	} 
	 
})

export default App;