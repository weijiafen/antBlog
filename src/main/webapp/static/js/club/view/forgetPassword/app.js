import React from 'react';
import { Steps ,Row , Col  } from 'antd';
import AccountPage from './AccountPage';
import CaptchaPage from './captchaPage';
import SetPasswordPage from './SetPasswordPage';
import SuccessPage from './SuccessPage';

const Step = Steps.Step;
var app=React.createClass({
	getInitialState(){
		return {
			current:0,
			captcha:"",
			email:"",
			account:""
		}
	},
	getEmail(email,account){
		this.setState({
			current:1,
			email:email,
			account:account
		})
	},
	setEmailCaptcha(val){
		this.setState({
			current:2,
			captcha:val
		})
		console.log("return captcha",val)
	},
	setPassword(){
		this.setState({
			current:3
		})
	},
	render(){
		var currentPage;
		if(this.state.current===0){
			currentPage=<AccountPage next={this.getEmail}/>
		}
		else if(this.state.current===1){
			currentPage=<CaptchaPage next={this.setEmailCaptcha} email={this.state.email}/>
		}
		else if(this.state.current===2){
			currentPage=<SetPasswordPage next={this.setPassword} captcha={this.state.captcha} account={this.state.account}/>
		}
		else if(this.state.current===3){
			currentPage=<SuccessPage/>
		}
		return (<div className="forgetPassword-home">
			<Row>
				<Col sm={0} md={4}></Col> 
				<Col sm={24} md={16}>
					<header>找回密码 </header>
				    <Steps current={this.state.current}>
					    <Step title="输入账号" />
					    <Step title="填写验证码"/>
					    <Step title="重置密码"/>
					    <Step title="操作结果" />
					</Steps>
					{currentPage}
				</Col> 
				<Col sm={0} md={4}></Col> 
			</Row>
		    
		  </div>);
	}
})

export default app;