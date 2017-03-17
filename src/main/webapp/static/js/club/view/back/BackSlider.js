import React from 'react';
import {Menu , Icon, Button , Modal } from 'antd'
import backService from '../../service/backService';
import PubSub from 'pubsub-js';
import {redirect} from '../../util/function.js';
const SubMenu = Menu.SubMenu;
var BackSlider=React.createClass({
	getInitialState(){
		return {
			menus:[]
		}
	},
	logOff(){
		backService.logOff().then((res)=>{
			if(res.status==0){
				PubSub.publish('changeLogin',false);
				Modal.info({
					title:'注销成功'
				})
				redirect('#/login');
			}else{
				Modal.info({
					title:'注销失败'
				})
			}
		})
		
	},
	render:function(){
		return <div className="">
			<div>
				个人信息：
				<Button type="primary" onClick={this.logOff}>注销</Button>
			</div>
			<Menu
				onClick={this.handleClick}
		        style={{ width: 240 }}
		        defaultSelectedKeys={['1']}
		        defaultOpenKeys={['sub1']}
		        mode="inline"
		        theme='dark'
			>
				<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
		          <Menu.Item key="5">Option 5</Menu.Item>
		          <Menu.Item key="6">Option 6</Menu.Item>
		        </SubMenu>
			</Menu>
		</div>
	}
})

export default BackSlider;