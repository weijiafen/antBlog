import React from 'react';
import {Row ,Col , Card, Form, Input, Button ,Modal ,Spin} from 'antd'
import backService from '../../service/backService'; 
import {redirect} from '../../util/function.js';
import PubSub from 'pubsub-js'; 
const FormItem = Form.Item;
const NormalRegisterForm = Form.create()(React.createClass({
	getInitialState(){
		return {
			confirmDirty:false,
      loading:false,
      captcha:"/captcha?"+new Date().valueOf()
		}
	},
 	handleSubmit(e) {
	    e.preventDefault();
      var ctx=this;
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
          ctx.setState({
            loading:true
          })
	        backService.register(values).then((res)=>{
	          if(res.status==0){
	            Modal.info({title:res.msg}) 
              redirect('#/back');
              PubSub.publish('changeLogin',true)
	          }else{
	            Modal.info({title:res.msg}) 
              ctx.getCaptcha();
              ctx.setState({
                loading:false
              })
	          }
	        })
	      }
    });
  },
  getCaptcha(){
    this.setState({
      captcha:"/captcha?"+new Date().valueOf()
    })
  },
  //输入password时的验证规则
  checkConfirm(rule, value, callback){
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  //输入confirm password时的验证规则
  checkPassword(rule, value, callback){ 
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <FormItem
        	{...formItemLayout}
          label="Account"
          hasFeedback>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your account!' },
            	{type:'string',message:'Must be 6 to 20 letters or numbers!',pattern:/^[a-zA-Z0-9\.]{6,20}$/}
             ],
          })(
            <Input placeholder="account" />
          )}
        </FormItem>
        <FormItem
        	{...formItemLayout}
        	label='Password'
        	hasFeedback>
        	{getFieldDecorator('password',{
        		rules:[{
        			required:true,message:'please input your password!'
        		},
        		{type:'string',message:'Must be 6 to 20 letters or numbers!',pattern:/^[a-zA-Z0-9]{6,20}$/},
        		{validator: this.checkConfirm,}
        		]
        	})(
        		<Input type="password" placeholder="password" />
        		)}
        </FormItem>
        <FormItem
        	{...formItemLayout}
        	label="Confirm Password"
        	hasFeedback
        	>
        	{getFieldDecorator('confirm',{
        		rules:[{
        			required:true,message:'please confirm your  password!'
        		},
        		{type:'string',message:'Must be 6 to 20 letters or numbers!',pattern:/^[a-zA-Z0-9]{6,20}$/},
        		{validator: this.checkPassword,}
        		]
        	})(
        		<Input type="password" onBlur={this.handleConfirmBlur} placeholder="confrim password" />
        		)}
        </FormItem>
        <FormItem
        	{...formItemLayout}
          label="Username"
          hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }
             ],
          })(
            <Input placeholder="userName"/>
          )}
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Email"
          hasFeedback>
          {getFieldDecorator('email', {
            rules: [{ required: true, type:'email', message: 'Please input your Email!' }
             ],
          })(
            <Input placeholder="Email"/>
          )}
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="captcha"
          >
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: 'Please input your captcha!' }
             ],
          })(
            <Input placeholder="captcha"  style={{width:'30%'}}  />
          )}
          <img src={this.state.captcha} style={{width:'30%',verticalAlign:'middle'}} />
          <a onClick={this.getCaptcha} style={{width:'40%',verticalAlign:'bottom'}}>change captcha</a>
        </FormItem>
        <FormItem>
          <Spin spinning={this.state.loading}>
            <Button htmlType="submit" className="register-form-button">
            register and login
            
          </Button>
          </Spin>
          Or <a href="#/login">login now!</a>
        </FormItem>
      </Form>
    );
  },
}));
var register=React.createClass({
	render:function(){
		return <div className="loginFormContainer">
			<Row align="middle">
				<Col sm={0} md={8}></Col>
				<Col sm={24} md={8}>
					<Card title="注册">
						<NormalRegisterForm />
					</Card>
				</Col>
				<Col sm={0} md={8}></Col>
			</Row>
		</div>
	}
})

export default register;