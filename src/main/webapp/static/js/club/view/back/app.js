import React from 'react';
import {Row ,Col , Card, Form, Icon, Input, Button, Checkbox} from 'antd'
import backService from '../../service/backService'; 
import BackSlider from './BackSlider'
var back=React.createClass({
	render:function(){
		return <div className="backContainer">
			<Row align="middle">
				<Col sm={24} md={4}>
					<BackSlider />
				</Col>
				<Col sm={24} md={20} style={{paddingLeft:'30px',paddingTop:'12px'}}>
					{this.props.children}
				</Col>
			</Row>
		</div>
	}
})

export default back;