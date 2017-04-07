import React from 'react'
import { Row , Col , Form , Input  , Button , Modal } from 'antd'
import passwordService from '../../service/passwordService'
const FormItem = Form.Item;
const NormalForm = Form.create()(React.createClass({
	getInitialState(){
		return {
			loading:false
		}
	},
	//输入confirm password时的验证规则
	  checkPassword(rule, value, callback){ 
	    const form = this.props.form;
	    if (value && value !== form.getFieldValue('password')) {
	      callback('两次密码不一致!');
	    } else {
	      callback();
	    }
	  },
	  //输入password时的验证规则
	  checkConfirm(rule, value, callback){
	    const form = this.props.form;
	    if (value && this.state.confirmDirty) {
	      form.validateFields(['confirmPassword'], { force: true });
	    }
	    callback();
	  },
	handleSubmit(e) {
	    e.preventDefault();
	      var ctx=this;
	      const {setFieldsValue}=this.props.form;
		    this.props.form.validateFields((err, values) => {
		      if (!err) {
	          ctx.setState({
	            loading:true
	          })
	          values.type=2;
	          passwordService.modifyPassword(values).then((res)=>{
	          	if(res.status===0){
	          		
	          		setFieldsValue({"oldPassword":""})
	          		setFieldsValue({"password":""})
	          		setFieldsValue({"confirmPassword":""})
	          	}
	      		Modal.error({
	      			title:res.msg,
	      			onCancel:function(){}
	      		})
	          	
	          	ctx.setState({
		            loading:false
		          })
	          })
		      }
	    });
	  },
	render (){
		const {getFieldDecorator}=this.props.form;
		const formItemLayout={
			labelCol:{span:6},
			wrapperCol:{span:14}
		} 
		return (
			<Form onSubmit={this.handleSubmit} style={{marginTop:"50px"}}>
				<FormItem
					{...formItemLayout}
					label="原密码"
					hasFeedback>
					{getFieldDecorator("oldPassword",{
						rules:[
							{required:true,message:"请输入原密码"},
							{type:"string",message:"密码必须是6-20个字符的字母或数字",pattern:/^[a-zA-Z0-9\.]{6,20}$/}
						]
					})(<Input type="password" placeholder="old password"/>)}
				</FormItem>
				<FormItem 
					{...formItemLayout}
					label="新密码"
					hasFeedback>
					{getFieldDecorator("password",{
						rules:[
							{required:true,message:"请输入新密码"},
							{type:"string",message:"密码必须是6-20个字符的字母或数字",pattern:/^[a-zA-Z0-9\.]{6,20}$/},
							{validator: this.checkConfirm,}
						]
					})(<Input type="password" placeholder="new password"/>)}
				</FormItem>
				<FormItem
		        	{...formItemLayout}
		        	label="Confirm Password"
		        	hasFeedback
		        	>
		        	{getFieldDecorator('confirmPassword',{
		        		rules:[{
		        			required:true,message:'please confirm your  password!'
		        		},
		        		{type:'string',message:'Must be 6 to 20 letters or numbers!',pattern:/^[a-zA-Z0-9]{6,20}$/},
		        		{validator: this.checkPassword,}
		        		]
		        	})(
		        		<Input type="password" placeholder="confrim password" />
		        		)}
		        </FormItem>
		        <FormItem>
		          
		            <Button type="primary" htmlType="submit" className="" loading={this.state.loading}>
		            修改
		            
		          </Button>
		          
		        </FormItem>
			</Form>
			)
	}
}))
var app=React.createClass({
	render(){
		return (<div>
			<header>修改密码：</header>
			<Row>
				<Col sm={0} md={8}></Col>
				<Col sm={24} md={8}>

					<NormalForm/>
				</Col>
				<Col sm={0} md={8}></Col>
			</Row>
		</div>)
	}
})
export default app;