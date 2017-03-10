import React from 'react';
import { Row , Col} from 'antd';
import Head from './head';

var blog=React.createClass({
	getInitialState(){
		return {
			userId:null,
			typeId:null
		}
	},
	componentWillMount(){
		let userId=this.props.params.userId;
		let typeId=this.props.params.typeId;
		this.setState({
			userId:userId,
			typeId:typeId
		})
	},
	componentWillReceiveProps(obj){
		let userId=obj.params.userId;
		let typeId=obj.params.typeId;
		this.setState({
			userId:userId,
			typeId:typeId
		})
	},
	render:function(){
		return <section className="blogWrap">
			<div className="blogView">
				<Row>
					<Col xs={0} sm={0} md={2} lg={3}></Col>
					<Col xs={24} sm={24} md={20} lg={18} className="blogBody">
						<Row>
							<Col xs={24} sm={24} md={6} lg={6}>
								<Head userId={this.state.userId} typeId={this.state.typeId} />
							</Col>
							<Col xs={24} sm={24} md={18} lg={18}>
								{this.props.children}
								
							</Col>
						</Row>
						 
					</Col>
					<Col xs={0} sm={0} md={2} lg={3}></Col>

				</Row>
			</div>
		
		</section>
	}
})

export default blog;