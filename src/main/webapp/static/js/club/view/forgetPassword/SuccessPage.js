import React from 'react';
import { Row , Col , Input , Button ,Alert  } from 'antd';
import {redirect} from '../../util/function.js';
var app=React.createClass({
	toLogin(){
		redirect('#/login');
	},
	render(){
		return (<div>
				<Row>
					<Col xs={1} sm={8}></Col>
					<Col xs={22} sm={8}>
						<Alert message="重置密码成功" type="success" style={{marginTop:"100px",fontSize:"16px",lineHeight:"2.5"}}/>
						
						<Button type="primary" style={{marginTop:"20px"}} onClick={this.toLogin}>去登录</Button>
					</Col>
					<Col xs={1} sm={8}></Col>
				</Row>
			</div>)
	}
})
export default app;