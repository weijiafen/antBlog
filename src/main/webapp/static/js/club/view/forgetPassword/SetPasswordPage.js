import React from 'react';
import { Row , Col , Input , Button , Modal } from 'antd';
import passwordService from '../../service/passwordService'
var app=React.createClass({
	getInitialState(){
		return {
			password:"",
			confirm:"",
			captcha:this.props.captcha,
			account:this.props.account
		}
	},
	next(){
		var pattern =/^[a-zA-Z0-9]{6,20}$/
		if(!pattern.test(this.state.password)){
			Modal.error({
				title:"密码必须是6-20个字符的字母或数字",
				onCancel:function(){}
			})
		}
		else if(this.state.password!==this.state.confirm){
			Modal.error({
				title:"两次密码不一致",
				onCancel:function(){}
			})
		}else{
			passwordService.modifyPassword({
				type:1,
				account:this.state.account,
				emailCaptcha:this.state.captcha,
				password:this.state.password,
				confirmPassword:this.state.confirm
			}).then((res)=>{
				if(res.status===0){
					this.props.next();
				}else{
					Modal.error({
						title:res.msg,
						onCancel:function(){}
					})
				}
				
			})
			
		}
		
	},
	changePassword(e){
		this.setState({
			password:e.target.value
		})
	},
	changeConfirmPassword(e){
		this.setState({
			confirm:e.target.value
		})
	},
	render(){
		return (<div>
				<Row>
					<Col xs={1} sm={8}></Col>
					<Col xs={22} sm={8}>
						<Input type="password" style={{marginTop:"100px"}} placeholder="新密码" onChange={this.changePassword}/>
						<Input type="password" style={{marginTop:"10px"}} placeholder="重复新密码" onChange={this.changeConfirmPassword}/>
						<Button type="primary" style={{marginTop:"20px"}} onClick={this.next}>下一步</Button>
					</Col>
					<Col xs={1} sm={8}></Col>
				</Row>
			</div>)
	}
})
export default app;