import React from 'react';
import { Row , Col } from 'antd';

var App=React.createClass({
	render(){
		let bgimg={
			backgroundImage:`url(${this.props.data.background_img})`
		}
		if(!this.props.data.isShow){
			return <section className="personal_info" ></section>
		}else{
			return <section className="personal_info"  style={bgimg} >
				<Row>
					<Col xs={0} sm={0} md={4} lg={6}></Col>
					<Col xs={24} sm={24} md={18} lg={12}>
						<h2 className="section_title">{this.props.data.title}</h2>
						{this.props.data.data.map((item)=>{
							return <Col xs={24} sm={24} md={12} lg={12} key={item.key}>
								<p className="wow fadeIn animated animated">{item.key}：<span>{item.value}</span></p>
							</Col>
						})}
						<img src={this.props.data.img}/>
					</Col>
					<Col xs={0} sm={0} md={4} lg={6}></Col>
				</Row>

			</section>
		}
	}
})
export default App;