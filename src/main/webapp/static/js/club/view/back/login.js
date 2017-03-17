import React from 'react';
import {Row ,Col , Card, Form, Icon, Input, Button, Checkbox ,Modal} from 'antd'
import backService from '../../service/backService'; 
import {redirect} from '../../util/function.js';
import PubSub from 'pubsub-js'; 
const FormItem = Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        backService.login(values).then((res)=>{
          if(res.status==0){
            redirect('#/back');
            PubSub.publish('changeLogin',true)
          }else{
            Modal.info({title:res.msg}) 
          }
        })
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your account!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="account" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="#/register">register now!</a>
        </FormItem>
      </Form>
    );
  },
}));
var back=React.createClass({
	render:function(){
		return <div className="loginFormContainer">
			<Row align="middle">
				<Col sm={0} md={8}></Col>
				<Col sm={24} md={8}>
					<Card title="登录">
						<NormalLoginForm />
					</Card>
				</Col>
				<Col sm={0} md={8}></Col>
			</Row>
		</div>
	}
})

export default back;