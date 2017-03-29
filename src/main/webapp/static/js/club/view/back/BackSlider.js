import React from 'react';
import {Menu , Icon, Button , Modal } from 'antd'
import backService from '../../service/backService';
import PubSub from 'pubsub-js';
import {redirect} from '../../util/function.js';
import moment from 'moment'
const SubMenu = Menu.SubMenu;
var BackSlider=React.createClass({
	getInitialState(){
		return {
			resumeTitles:['基础资料','个人信息','技能自评','项目经历','工作经历','获奖经历','个人书库'],
			userName:'',
			updateAt:0,
			img:''
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
	componentDidMount(){
		this.getInitData();

		//在全局中放置token并每次渲染组件时判断是否存在，防止重复订阅事件
		if(window.reloadInfoToken){
			PubSub.unsubscribe(window.reloadInfoToken);
		}
		window.reloadInfoToken=PubSub.subscribe('reloadInfo',function(){
			this.getInitData();
		}.bind(this))
	},
	getInitData(){
		backService.getInfo().then((res)=>{
			this.setState({
				userName:res.data.userName,
				updateAt:res.data.updateAt,
				img:res.data.img,
				resumeTitles:res.data.resumeTitles
			})
		})
	},
	handleClick:function(obj){
		redirect(obj.key)
	},
	render:function(){
		return <div className="BackSlider">
			<div>
				<h2>你好：{this.state.userName}</h2>
				<img src={this.state.img}/>
				<p>最后一次登录时间：{moment(this.state.updateAt).format("YYYY-MM-DD HH:mm:ss")}</p>
				<Button type="primary" onClick={this.logOff}>注销</Button>
			</div>
			<Menu
				onClick={this.handleClick}
		        defaultSelectedKeys={['1']}
		        defaultOpenKeys={['sub1']}
		        mode="inline"
		        theme='dark'
			>
				<SubMenu key="sub1" title={<span><Icon type="appstore" /><span>主页管理</span></span>}>
		          <Menu.Item key="#/back/editTop">{this.state.resumeTitles[0]}</Menu.Item>
		          <Menu.Item key="#/back/editPersonalInfo">{this.state.resumeTitles[1]}</Menu.Item>
		          <Menu.Item key="#/back/editSkillsLevel">{this.state.resumeTitles[2]}</Menu.Item>
		          <Menu.Item key="#/back/editProjectExp">{this.state.resumeTitles[3]}</Menu.Item>
		          <Menu.Item key="#/back/editWorkExp">{this.state.resumeTitles[4]}</Menu.Item>
		          <Menu.Item key="#/back/editCompetition">{this.state.resumeTitles[5]}</Menu.Item>
		          <Menu.Item key="#/back/editLibrary">{this.state.resumeTitles[6]}</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub2" title={<span><Icon type="edit" /><span>博客管理</span></span>}>
		          <Menu.Item key="#/back/category">管理分类</Menu.Item>
		          <Menu.Item key="#/back/ArticalList">管理文章</Menu.Item>
		        </SubMenu>
		        <Menu.Item key="#/back/message"><Icon type="notification" />消息中心</Menu.Item>
		        <Menu.Item key="#/back/account"><Icon type="user" />账号中心</Menu.Item>
			</Menu>
		</div>
	}
})

export default BackSlider;