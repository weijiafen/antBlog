import React from 'react';
// import { NavBar } from 'antd-mobile';
import { Row, Col , Menu,Icon } from 'antd';

import nav_icon from '../../../../images/logo.png'
// let menus=(``)
var Navbar=React.createClass({
	getInitialState() {
		
		let current=this.props.location.pathname;
	    return {
	      current: [current],
	    };
	  },
	componentDidMount(){
	},
 	MenuClick:function(item){
			 window.location.hash = item.key;
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
					          Square
				        </Menu.Item>
				         <Menu.Item key="#/back">
					         Back
				        </Menu.Item>
					</Menu>
				</Col>
				
			</Row>
		</div>
	}
})

export default Navbar;