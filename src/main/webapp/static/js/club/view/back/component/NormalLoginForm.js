import React from 'react';
import {Row ,Col , Card, Form, Icon, Input, Button, Checkbox ,Modal , Spin} from 'antd'
import backService from '../../../service/backService'; 
import PubSub from 'pubsub-js'; 
import {redirect} from '../../../util/function.js';
const FormItem = Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  getInitialState(){
    return {
      loading:false
    }
  },
  getDefaultProps(){
  	return {
  		onSuccess:function(){
  			redirect('#/back');
  		},
  		onFail:function(){},
  		onRegister:function(){
  			redirect('#/register')
  		},
  		onForget:function(){
  			redirect('#/forgetPassword')
  		}
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
        backService.login(values).then((res)=>{
          if(res.status==0){
            
            this.props.onSuccess();
            PubSub.publish('changeLogin',true)
          }else{
          	this.props.onFail();
            Modal.info({title:res.msg}) 
          }
          ctx.setState({
            loading:false
          })
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
          <Spin spinning={this.state.loading}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Spin>
          Or <a onClick={this.props.onRegister}>register now!</a>
        </FormItem>
      </Form>
    );
  },
}));
export default NormalLoginForm