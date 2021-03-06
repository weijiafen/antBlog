import React from 'react';
import { Row , Col ,Menu , Button , Modal } from 'antd';
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
			 userId:userId,
			 isFans:false
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
				isFans:res.data.isFans
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
	},
	clickMenu(e){
		this.setState({
			categoryId:e.key
		})
	},
	setFans(){
		var ctx=this;
		blogService.setFans({
			targetId:this.state.userId
		})
		.then((res)=>{
			if(res.status===0){
				ctx.setState({
					isFans:true
				})
			}
			Modal.info({
				title:res.msg,
				onCancel:function(){}
			})
		})
	},
	cancelFans(){
		var ctx=this;
		blogService.cancelFans(this.state.userId)
		.then((res)=>{
			if(res.status===0){
				ctx.setState({
					isFans:false
				})
			}
			Modal.info({
				title:res.msg,
				onCancel:function(){}
			})
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
		var fansBtn;
		if(this.state.isFans){
			fansBtn=<Button size="small" style={{verticalAlign:"text-bottom",marginLeft:"5px"}} onClick={this.cancelFans}>取消关注</Button>
		}
		else{
			fansBtn=<Button size="small" style={{verticalAlign:"text-bottom",marginLeft:"5px"}} onClick={this.setFans}>关注</Button>
		}
		return <section className="blogLeft">
			<div className="blogInfoContainer">
				<img src={this.state.photo} />
				<div className="blogInfo primaryBg">
					<h2>{this.state.name}
						{fansBtn}
					</h2>
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