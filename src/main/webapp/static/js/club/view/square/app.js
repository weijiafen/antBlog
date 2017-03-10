import React from 'react';
import {Row , Col , Card,Button } from 'antd';
import squareService from '../../service/squareService';
var square=React.createClass({
	getInitialState(){
		return {
			userList:[]
		}
	},
	componentWillMount(){
		squareService.getUser()
			.then((res)=>{
				if(res){
					this.setState({
						userList:res.data
					})
				}
			})
	},
	render:function(){
		return (<div className="squareContainer">
			<Row>
				<Col xs={1} sm={2} md={2} lg={2}></Col>
				<Col xs={22} sm={20} md={20} lg={20}>
					<Row gutter={16} type="flex" align="top">
						{
							this.state.userList.map((item,i)=>{
								return (<Col xs={24} sm={24} md={8} lg={6} key={i}>
									<Card bodyStyle={{margin:5}} className="userCard">
										<img src={item.img} width="100%" />
										<h2>{item.userName}</h2>
										<p dangerouslySetInnerHTML={{__html:item.introduce}}></p>
										<Button type="primary" className="homeBtn">
											<a href={`#/home/${item.userId}`}>简介</a>
										</Button>
										<Button type="primary" className="blogBtn">
											<a href={`#/blog/${item.userId}/0`}>博客</a>
										</Button>
									</Card>
								</Col>)
							})
						}
					</Row>
				</Col>
				<Col xs={1} sm={2} md={2} lg={2}></Col>
				
			</Row>
		</div>)
	}
})

export default square;