import React from 'react';
import { Icon, message , Button, Input  , Modal ,Spin ,Select , Checkbox  } from 'antd'
import articalDeTailService from '../../../service/back/articalDeTailService';
import _ from 'underscore';
import UEditor from '../component/ueditor';
import moment from 'moment';
function findIndex(arr,id){
	var index=0;
	for(var i=0;i<arr.length;i++){
		if(id===arr[i].id){
			index = i
		}
	}
	return index;
}
var editArtical=React.createClass({
	getInitialState(){
		return {
			loading:false,
			menus:[],
			currentMenu:"",
			category:[],
			currentCategory:"",
			createAt:undefined,
			updateAt:undefined,
			id:undefined,
			articalName:'',
			title:'新增文章',
			notifyFans:true
		}
	},
	componentDidMount(){
		let id=this.props.params.id;
		var ctx=this;
		if(id){
			this.setState({
				id:id,
				title:'编辑文章'
			})
			
		}
		articalDeTailService.getCategory().then((res)=>{
			if(res.status===0){
				this.setState({
					menus:res.data.menus
				},function(){
					if(id){
						articalDeTailService.getArticalDetail(id).then((res)=>{
							if(res.status===0){
								var menuIndex=findIndex(this.state.menus,res.data.menuId);
								this.setState({
									articalName:res.data.articalName,
									createAt:res.data.createAt,
									updateAt:res.data.updateAt,
								})
								//模拟切换菜单
								this.selectMenu(res.data.menuId,{props:{index:menuIndex}});
								this.selectCategory(res.data.categoryId);
								setTimeout(function(){
									ctx.refs.editor.setContent(res.data.articalContent,false)
								},0)
								
							}
						})
					}
				})
			}
			
		})

	},
	selectMenu(value,option){
		var menus=this.state.menus;
		var index=option.props.index;
		this.setState({
			currentMenu:""+value,
			category:menus[index].children,
			currentCategory:""
		})
	},
	selectCategory(value,option){
		this.setState({
				currentCategory:""+value
			})
	},
	changeName(e){
		this.setState({
			articalName:e.target.value
		})
	},
	changeNotify(e){
		this.setState({
			notifyFans:e.target.checked
		})
	},
	editArtical(){
		if(this.state.currentCategory===""){
			message.error("必须选择文章分类")
		}
		else if(this.state.articalName===""){
			message.error("文章标题不能为空！")
		}else{
			var articalContent=this.refs.editor.getContent()
			articalDeTailService.setArticalDetail({
				id:this.state.id,
				categoryId:this.state.currentCategory,
				articalName:this.state.articalName,
				notifyFans:this.state.notifyFans,
				articalContent:articalContent
			}).then((res)=>{
				if(res.status===0){
					this.setState({
						updateAt:res.data.updateAt
					})
					if(res.data.createAt){
						this.setState({
							createAt:res.data.createAt,
							id:res.data.id,
						})
					}
				}
				Modal.info({
					title:res.msg,
					onOk:function(){}
				})
			})
		}
	},
	render(){ 
		return (
			<div>
				<Spin spinning={this.state.loading}>
					<header>{this.state.title}</header>
					<div className="editItem">
						<label>一级菜单：</label>
						<Select style={{width:120}} value={this.state.currentMenu} onSelect={this.selectMenu}>
							{
								this.state.menus.map(function(menu,index){
									return <Select.Option value={""+menu.id} key={"menu"+index}>{menu.menuName}</Select.Option>
								})
							}
						</Select>
						<label>二级菜单：</label>
						<Select style={{width:120}} value={this.state.currentCategory} onSelect={this.selectCategory}>
							{
								this.state.category.map(function(item,index){
									return <Select.Option value={""+item.id} key={"menu"+index}>{item.categoryName}</Select.Option>
								})
							}
						</Select>
					</div>
					<div className="editItem">
						<label>文章标题：</label>
						<Input value={this.state.articalName} onChange={this.changeName} />
					</div>
					<div className="editItem">
						<label>创建时间：{this.state.createAt?moment(this.state.createAt).format("YYYY-MM-DD HH:mm-ss"):'unknow '}</label>
						<label>修改时间：{this.state.updateAt?moment(this.state.updateAt).format("YYYY-MM-DD HH:mm-ss"):'unknow '}</label>
					</div>
					<div className="editItem">
						<Checkbox onChange={this.changeNotify} checked={this.state.notifyFans}>向粉丝推送邮箱通知</Checkbox>
					</div>
					<div className="editorContainer">
						<UEditor ref="editor" />
						<div className="editItem">
							<Button type="primary" onClick={this.editArtical}>
								保存
							</Button>
						</div>
					</div>
				</Spin>
			</div>
			)
	}
})
export default editArtical;