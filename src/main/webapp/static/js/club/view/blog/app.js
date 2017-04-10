import React from 'react';
import { Row , Col , Layout} from 'antd';
import Head from './head';
const { Header, Content, Footer, Sider } = Layout;
var blog=React.createClass({
	getInitialState(){
		return {
			userId:null,
			typeId:null
		}
	},
	componentWillMount(){
		let userId=this.props.params.userId;
		let typeId=this.props.params.typeId;
		this.setState({
			userId:userId,
			typeId:typeId
		})
	},
	componentWillReceiveProps(obj){
		let userId=obj.params.userId;
		let typeId=obj.params.typeId;
		this.setState({
			userId:userId,
			typeId:typeId
		})
	},
	render:function(){
		return <section className="blogWrap">
			<div className="blogView">
				<Row>
					<Col xs={0} sm={0} md={2} lg={3}></Col>
					<Col xs={24} sm={24} md={20} lg={18} className="blogBody">
						<Layout>
							<Sider
					           breakpoint="md"
			    				collapsedWidth="0"
			    				width="300"
			    				style={{backgroundColor:'#fff'}}
					        >
					        	<Head userId={this.state.userId} typeId={this.state.typeId} />
					        </Sider>
					        <Layout>
					        	<Content className="">
					        		{this.props.children}
					        	</Content>
					        	
					        </Layout>
						</Layout>
						
						 
					</Col>
					<Col xs={0} sm={0} md={2} lg={3}></Col>

				</Row>
			</div>
		
		</section>
	}
})

export default blog;