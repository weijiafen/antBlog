import React from 'react';
import {Row ,Col , Card, Form, Icon, Input, Button, Checkbox ,Modal , Spin} from 'antd'
import backService from '../../service/backService'; 
import {redirect} from '../../util/function.js';
import PubSub from 'pubsub-js'; 

import NormalLoginForm from './component/NormalLoginForm';
var app=React.createClass({
	render:function(){
		return <div className="loginFormContainer">
			<Row align="middle">
				<Col sm={0} md={8}></Col>
				<Col sm={24} md={8}>
					<Card title="登录">
						<NormalLoginForm/>
					</Card>
				</Col>
				<Col sm={0} md={8}></Col>
			</Row>
		</div>
	}
})

export default app;