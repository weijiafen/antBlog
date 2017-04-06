import React from 'react';
import { Row , Col , Input , Button ,Modal } from 'antd';
import passwordService from '../../service/passwordService'
var app=React.createClass({
	getInitialState(){
		return {
			captcha:"",
			email:this.props.email

		}
	},
	next(){
		if(this.state.captcha===""){
			Modal.error({
				title:"验证不能为空",
				onCancel:function(){}
			})
		}else{
			passwordService.setEmailCaptcha({
				emailCaptcha:this.state.captcha
			}).then((res)=>{
				if(res.status===0){
					this.props.next(res.data)
				}else{
					Modal.error({
						title:res.msg,
						onCancel:function(){}
					})
				}
			})
			
		}
	},
	changeCaptcha(e){
		this.setState({
			captcha:e.target.value
		})
	},
	render(){
		return (<div>
				<Row>
					<Col xs={1} sm={8}></Col>
					<Col xs={22} sm={8}>
						<p style={{marginTop:"100px",fontSize:"16px",lineHeight:"2.5"}}   >验证码已发送到{this.state.email}：</p>
						<Input placeholder="验证码" onChange={this.changeCaptcha}/>
						<Button type="primary" style={{marginTop:"20px"}} onClick={this.next}>下一步</Button>
					</Col>
					<Col xs={1} sm={8}></Col>
				</Row>
			</div>)
	}
})
export default app;