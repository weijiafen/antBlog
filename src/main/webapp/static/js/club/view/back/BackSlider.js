import React from 'react';
import {Menu , Icon, Button , Modal } from 'antd'
import backService from '../../service/backService';
import PubSub from 'pubsub-js';
import {redirect} from '../../util/function.js';
const SubMenu = Menu.SubMenu;
var BackSlider=React.createClass({
	getInitialState(){
		return {
			resumeTitles:['基础资料','个人信息','技能自评','项目经历','工作经历','获奖经历','个人书库']
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
	handleClick:function(obj){
		redirect(obj.key)
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
				<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>主页管理</span></span>}>
		          <Menu.Item key="#/back/editTop">{this.state.resumeTitles[0]}</Menu.Item>
		          <Menu.Item key="#/back/editPersonalInfo">{this.state.resumeTitles[1]}</Menu.Item>
		          <Menu.Item key="#/back/editSkillsLevel">{this.state.resumeTitles[2]}</Menu.Item>
		          <Menu.Item key="#/back/editProjectExp">{this.state.resumeTitles[3]}</Menu.Item>
		          <Menu.Item key="#/back/editWorkExp">{this.state.resumeTitles[4]}</Menu.Item>
		          <Menu.Item key="#/back/editCompetition">{this.state.resumeTitles[5]}</Menu.Item>
		          <Menu.Item key="#/back/editLibrary">{this.state.resumeTitles[6]}</Menu.Item>
		        </SubMenu>
			</Menu>
		</div>
	}
})

export default BackSlider;