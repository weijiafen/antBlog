import React from 'react';
import { Row , Col , Icon } from 'antd';

var App=React.createClass({
	render(){
		if(!this.props.data.isShow){
			return <section className="competitions" ></section>
		}else{
			let bgimg={
			backgroundImage:`url(${this.props.data.background_img})`
			}
			return <section className="competitions" style={bgimg}>
				<Row>
					<Col xs={0} sm={0} md={4} lg={6}></Col>
					<Col xs={24} sm={24} md={18} lg={12}>
						<h2>{this.props.data.title}</h2>
						<Row type="flex" align="top">
						{this.props.data.data.map((item,index)=>{
							return <Col xs={24} sm={12} md={6} lg={6} key={"competitionItem"+index} className="competitions_container wow bounceInUp animated animated">
								<div className="competitions_item">
									<img src={item.itemImg}/>
									<p>{item.itemTxt}</p>
									<p className="itemDate">{item.itemDate}</p>
								</div>
							</Col>
						})}
						</Row>
						<img src={this.props.data.img}/>
					</Col>

					<Col xs={0} sm={0} md={4} lg={6}></Col>
				</Row>

			</section>
		}
	}
})
export default App