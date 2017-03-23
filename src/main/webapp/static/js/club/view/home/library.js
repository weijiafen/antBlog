import React from 'react';
import { Row , Col , Progress  } from 'antd';

var App=React.createClass({
	render(){
		if(!this.props.data.isShow){
			return <section className="library" ></section>
		}else{
			let bgimg={
			backgroundImage:`url(${this.props.data.background_img})`
			}
			return <section className="library" style={bgimg}>
				<Row>
					<Col xs={0} sm={0} md={3} lg={4}></Col>
					<Col xs={24} sm={24} md={18} lg={16}>
						<h2>{this.props.data.title}</h2>
						<Row type="flex" align="bottom">
						{this.props.data.data.map((item,index)=>{
							return <Col xs={24} sm={12} md={6} lg={6} key={"libraryItem"+index} className="library_container wow zoomIn animated animated">
								<div className="library_item">
									<img src={item.itemImg}/>
									<p>{item.itemTitle}</p>
									<p className="itemProgress">进度：{item.itemCurrent}/{item.itemSum}</p>
									<Progress percent={parseInt(item.itemCurrent/item.itemSum*100)} />
								</div>
							</Col>
						})}
						</Row>
						<img src={this.props.data.img}/>
					</Col>

					<Col xs={0} sm={0} md={3} lg={4}></Col>
				</Row>

			</section>
		}
	}
})
export default App