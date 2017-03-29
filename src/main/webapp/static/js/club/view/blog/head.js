import React from 'react';
import { Row , Col ,Menu} from 'antd';
import blogService from '../../service/blogService';
const SubMenu = Menu.SubMenu;
var head=React.createClass({
	getInitialState(){
		let categoryId=this.props.typeId;
		let userId=this.props.userId;
		return {
			name:"",
			photo:"",
			introduce:"",
			categoryId:categoryId,
			menus:[],
			 openKeys: [],
			 userId:userId
		}
	},
	componentWillMount(){
		let userId=this.props.userId;
		blogService.getHead(userId).then((res)=>{
			this.setState({
				name:res.data.name,
				photo:res.data.img,
				introduce:res.data.introduce,
				menus:res.data.menus,
			})
		})
	},
	componentWillReceiveProps(obj){
		let userId=obj.userId;
		let categoryId=obj.typeId;
		this.setState({
			userId:userId,
			categoryId:categoryId
		})
		// blogService.getHead(userId).then((res)=>{
		// 	this.setState({
		// 		name:res.name,
		// 		photo:res.photo,
		// 		introduce:res.introduce,
		// 		menus:res.menus,
		// 	})
		// })
	},
	clickMenu(e){
		this.setState({
			categoryId:e.key
		})
	},
	 onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = [].concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = [];
    }
    this.setState({ openKeys: nextOpenKeys });
  },
  
	render:function(){
		let ctx=this;
		return <section className="blogLeft">
			<div className="blogInfoContainer">
				<img src={this.state.photo} />
				<div className="blogInfo primaryBg">
					<h2>{this.state.name}</h2>
					<p dangerouslySetInnerHTML={{__html:this.state.introduce}}></p>
				</div>
				
			</div>
			<Menu  
        selectedKeys={[this.state.categoryId]}
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.clickMenu}
      >
      		<Menu.Item key="0">
      			<a href={`#/blog/${this.props.userId}/0`}>全部文章</a>
      		</Menu.Item>
      			{this.state.menus.map((sub)=>{
      				 return <SubMenu title={sub.menuName} key={"sub"+sub.id}>
      				 	{sub.children.map((type)=>{
      				 		return <Menu.Item key={`${type.id}`}>
      				 			<a href={`/#/blog/${this.props.userId}/${type.id}`}>{type.categoryName}</a>
      				 		</Menu.Item>
      				 	})}
					    
					  </SubMenu>
      			})}

			 
      		</Menu>
		</section>
	} 
})

export default head;