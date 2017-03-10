import React from 'react';
import { Row , Col , Icon } from 'antd';

var App=React.createClass({
	render(){
		if(!this.props.data.isShow){
			return <section className="project_exp" ></section>
		}else{
			let bgimg={
			backgroundImage:`url(${this.props.data.background_img})`
			}
			return <section className="project_exp" style={bgimg}>
				<Row>
					<Col xs={0} sm={0} md={4} lg={6}></Col>
					<Col xs={24} sm={24} md={18} lg={12}>
						<h2>{this.props.data.title}</h2>
						{this.props.data.data.map((item)=>{
							return <Col xs={24} sm={24} md={8} lg={8} key={item.id} className="project_container wow zoomIn animated animated">
								<div className="project_item">
									<h3>{item.itemTitle}</h3>
									{item.descriptions.map((des)=>{
										return <p key={des.key}>{des.key+des.value}</p>
									})}
								</div>
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
export default App