import React from 'react';
import {Row ,Col , Layout } from 'antd'
const { Header, Content, Footer, Sider } = Layout;
import backService from '../../service/backService'; 
import BackSlider from './BackSlider';
var back=React.createClass({
	getInitialState(){
		return {
			collapsed: false,
    		mode: 'inline',
		}
	},
	onCollapse(collapsed){
	    console.log(collapsed);
	    this.setState({
	      collapsed,
	      mode: collapsed ? 'vertical' : 'inline',
	    });
	  },
	render:function(){
		return <div className="backContainer">
			<Layout>
				<Sider
		           breakpoint="md"
    				collapsedWidth="0"
		        >
		        	<BackSlider />
		        </Sider>
		        <Layout>
		        	<Content className="backBody">
		        		{this.props.children}
		        	</Content>
		        	
		        </Layout>
			</Layout>
			
		</div>
	}
})

export default back;