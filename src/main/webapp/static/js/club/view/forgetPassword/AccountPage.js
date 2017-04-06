import React from 'react';
import { Row , Col , Input , Button , Modal } from 'antd';
import passwordService from '../../service/passwordService'
var app=React.createClass({
	getInitialState(){
		return {
			account:""
		}
	},
	changeAccount(e){
		this.setState({
			account:e.target.value
		})
	},
	next(){
		if(this.state.account===""){
			Modal.error({
				title:"账号名不能为空",
				onCancel:function(){}
			})
		}else{
			passwordService.getEmailCaptcha(this.state.account).then((res)=>{
				if(res.status===0){
					this.props.next(res.data,this.state.account)
				}else{
					Modal.error({
						title:res.msg,
						onCancel:function(){}
					})
				}
			})
			
		}
		
	},
	render(){
		return (<div>
				<Row>
					<Col xs={1} sm={8}></Col>
					<Col xs={22} sm={8}>
						<Input style={{marginTop:"100px"}} placeholder="账号" onChange={this.changeAccount}/>
						<Button type="primary" style={{marginTop:"20px"}} onClick={this.next}>下一步</Button>
					</Col>
					<Col xs={1} sm={8}></Col>
				</Row>
			</div>)
	}
})
export default app;