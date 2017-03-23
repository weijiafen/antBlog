import React from 'react';
import { Row , Col , Icon } from 'antd';

var App=React.createClass({
	render(){
		if(!this.props.data||!this.props.data.isShow){
			return <section className="skills_level" ></section>
		}else{
			let sessionStyle={
			backgroundImage:`url(${this.props.data.background_img})`,
			color:`${this.props.data.color}`
			}
			return <section className="skills_level" style={sessionStyle}>
				<Row>
					<Col xs={0} sm={0} md={4} lg={6}></Col>
					<Col xs={24} sm={24} md={18} lg={12}>
						<h2 className="section_title">{this.props.data.title}</h2>
						{this.props.data.data.map((item,index)=>{
							return <Col xs={24} sm={24} md={12} lg={12} key={"skillsItem"+index} >
								<p>
									{item.key}:
									{[0,1,2,3,4].map((num)=>{
										let glyph;
										if(item.value > num){
											glyph="star"
										}else{
											glyph="star-o"
										}
										return <Icon key={num+"skillIcon"} type={glyph} className='zoomIn animated wow  animated' aria-hidden="true" data-wow-delay={`${num*150}ms`}></Icon>
									})}
								</p>
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