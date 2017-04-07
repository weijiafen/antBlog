import React from 'react';
import { Row, Col , Menu } from 'antd';
import homeService from'../../service/homeService';
import nav_icon from '../../../../images/logo.png';
import {redirect} from '../../util/function.js'
import PubSub from 'pubsub-js'; 
var Navbar=React.createClass({
	getInitialState() {
		let current=this.props.location.pathname;
	    return {
	      current: [current],
	      isLogin:false
	    };
	  },
	toBack(key){
		//点击back时判断登录状态
		if(this.state.isLogin){
			redirect('#/back')
		}else{
			redirect('#/login')
		}
	},
	componentDidMount(){
		let ctx=this;
		//发布一个切换登录状态的任务给登录页面
		PubSub.subscribe('changeLogin',function(msg,data){
			ctx.setState({
				isLogin:data
			})
			window.isLogin=data;
		})
		//定义一个全局的isLogin变量，Pubsub无法return 值，只能这么做着先了，除非用上redux
		window.isLogin=false;
		homeService.isLogin().then((res)=>{
			if(res.status==0){
				ctx.setState({
					isLogin:true
				})
				window.isLogin=true;
			}else{
				ctx.setState({
					isLogin:false
				})
				window.isLogin=false;
			}
			
		})
	},
 	MenuClick:function(item){
 			if(item.key==='#/login'){
 				this.toBack(item.key);
			 
 			}else{
 				window.location.hash = item.key;
 			}
			this.setState({ 
				current:[item.key]
			})
		},
	render:function(){
		
		return <div className="top">
			<Row>
				<Col span={6}>
					<img src={nav_icon} className="nav_icon" />
				</Col>
				<Col span={18}>
					<Menu className="NavContainer" mode="horizontal" selectedKeys={this.state.current} onClick={this.MenuClick}>
						<Menu.Item key="/">
					          博主列表
				        </Menu.Item>
				         <Menu.Item onClick={this.toBack} key='#/login' >
					         后台
				        </Menu.Item>
					</Menu>
				</Col>
				
			</Row>
		</div>
	}
})

export default Navbar;