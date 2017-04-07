import React from 'react';
import {Row ,Col , Card, Form, Icon, Input, Button, Checkbox ,Modal , Spin} from 'antd'
import backService from '../../../service/backService'; 
import PubSub from 'pubsub-js'; 
import {redirect} from '../../../util/function.js';
const FormItem = Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  getInitialState(){
    return {
      loading:false,
      captcha:"/captcha?"+new Date().valueOf()
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
  componentDidMount(){
    const { setFieldsValue  } = this.props.form;
    var account=localStorage.getItem("account");
    var password=localStorage.getItem("password");
    setFieldsValue({account:account});
    setFieldsValue({password:password});
  },
  getCaptcha(){
    this.setState({
      captcha:"/captcha?"+new Date().valueOf()
    })
  },
  handleSubmit(e) {
    e.preventDefault();
    var ctx=this;
    const { getFieldValue  } = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //设置记住密码
        var isRemember=getFieldValue("remember")
        if(isRemember){
          var account=getFieldValue("account");
          var password=getFieldValue("password");
          localStorage.setItem("account",account);
          localStorage.setItem("password",password);
        }
        else{
          localStorage.setItem("account","");
          localStorage.setItem("password","");
        }
        

        ctx.setState({
            loading:true
          })
        backService.login(values).then((res)=>{
          if(res.status==0){
            
            this.props.onSuccess();
            PubSub.publish('changeLogin',true)
          }else{
          	this.props.onFail();
            this.getCaptcha();
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
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: 'Please input your captcha!' }],
          })(
            <Input  placeholder="captcha" style={{width:'30%'}} />

          )}
          <img src={this.state.captcha} style={{width:'30%',verticalAlign:'middle'}} />
          <a onClick={this.getCaptcha} style={{width:'40%',verticalAlign:'bottom'}}>change captcha</a>
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" onClick={this.props.onForget}>Forgot password</a>
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