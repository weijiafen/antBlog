import React from 'react';
import { Icon , Button, Input  , Modal ,Spin ,Select , Table } from 'antd'
import articalListService from '../../../service/back/articalListService';
import moment from 'moment';
import _ from 'underscore'
import {redirect} from '../../../util/function'
var ArticalList=React.createClass({
	getInitialState(){
		var ctx=this;
		return {
			loading:false,
			menus:[],
			currentMenu:"0",
			category:[],
			currentCategory:"0",
			pageSize:10,
			pageNum:1,
			total:0,
			columns:[{
					key:'id',
					title:'ID',
					dataIndex:'id'
				},
				{	
					key:'title',
					title:'文章标题',
					dataIndex:'articalName'
				},{
					key:"category",
					title:'文章分类',
					dataIndex:'categoryName'
				},
				{	
					key:'createAt',
					title:'发布时间',
					dataIndex:'createAt',
					render:function(value){
						return moment(value).format("YYYY-MM-DD HH:mm:ss")
					}
				},
				{
					key:'updateAt',
					title:'最后修改时间',
					dataIndex:'updateAt',
					render:function(value){
						return moment(value).format("YYYY-MM-DD HH:mm:ss")
					}
				},
				{
					key:'reading',
					title:'阅读量',
					dataIndex:'reading'
				},
				{
					key:'agree',
					title:'点赞数',
					dataIndex:'agree'
				},
				{
					key:'comment',
					title:'评论数',
					dataIndex:'comment'
				},
				{
					key:'operation',
					title:'操作',
					dataIndex:'id',
					render:function(value){
						var obj={
							children:'',
							props:{}
						}
						obj.children=(<div>
							<Button onClick={_.partial(ctx.editArtical,value)}>
								<Icon type="edit" />
							</Button>
							<Button onClick={_.partial(ctx.removeArtical,value)}>
								<Icon type="delete" />
							</Button>
						</div>)
						return obj;
					}
				}
				
			],
			dataSource:[]
		}
	},
	componentDidMount(){
		articalListService.getCategory().then((res)=>{
			if(res.status===0){
				this.setState({
					menus:res.data.menus
				})
			}
		})
		this.search();
	},
	selectMenu(value,option){
		var menus=this.state.menus;
		//获取option数组下标，减去全部项的第一个下标
		var index=option.props.index-1;
		if(value==="0"){
			this.setState({
				currentMenu:""+value,
				category:[],
				currentCategory:"0"
			})
		}else{
			this.setState({
				currentMenu:""+value,
				category:menus[index].children,
				currentCategory:"0"
			})
		}
		
	},
	selectCategory(value,option){
		this.setState({
				currentCategory:""+value
			})
	},
	paginationConfig() {
	    const self = this;
	    return {
	      current: this.state.pageNum,
	      pageSize: this.state.pageSize,
	      total: this.state.total ,
	      showSizeChanger: true,
	      onShowSizeChange(current,pageSize){
	      	 self.setState({
	      	 	pageSize:pageSize,
	      	 	pageNum:1
	      	 },function(){
	      	 	self.getArticalList(1)
	      	 })
	      	 
	      },
	      onChange(current) {
	        console.log('Current: ', current);
	        self.setState({
	        	pageNum:current
	        })
	        self.getArticalList(current)
	        
	      },
	      showTotal(total) {
	        return `共有${self.state.total}条数据`
	      }
	    }
	  },
	getArticalList(page){
		var state=this.state;
		var ctx=this;
		articalListService
			.getArticalList({
			menuId:this.state.currentMenu,
            categoryId:this.state.currentCategory,
            pageSize:this.state.pageSize,
            pageNum:page
			})
			.then((res)=>{
				if(res.status===0){
					this.setState({
						dataSource:res.data.articalList,
						total:res.data.total
					})
				}else{
					this.setState({
						dataSource:[],
						total:0
					})
				}
				
			})
	},
	editArtical(id){
		redirect(`/#/back/editArtical/${id}`)
	},
	newArtical(){
		redirect('/#/back/editArtical')
	},
	removeArtical(id){
		var ctx=this;
		articalListService.removeArtical(id).then((res)=>{
			Modal.info({
				title:res.msg,
				onCancel:function(){}
			})
			ctx.getArticalList(ctx.state.pageNum)
		})
	},
	search(){
		this.getArticalList(1);
	},
	render(){ 
		return (
			<div>
				<Spin spinning={this.state.loading}>
					<header>管理文章</header>
					<div className="editItem">
						<label>一级菜单：</label>
						<Select style={{width:120}} value={this.state.currentMenu} onSelect={this.selectMenu}>
							<Select.Option value="0">全部</Select.Option>
							{
								this.state.menus.map(function(menu,index){
									return <Select.Option value={""+menu.id} key={"menu"+index}>{menu.menuName}</Select.Option>
								})
							}
						</Select>
						<label>二级菜单：</label>
						<Select style={{width:120}} value={this.state.currentCategory} onSelect={this.selectCategory}>
							<Select.Option value="0">全部</Select.Option>
							{
								this.state.category.map(function(item,index){
									return <Select.Option value={""+item.id} key={"menu"+index}>{item.categoryName}</Select.Option>
								})
							}
						</Select>
						<Button type="primary" onClick={this.search}>筛选</Button>
					</div>
					<div className="editItem">
						<Button className="newArticalBtn" type="primary" onClick={this.newArtical}>写文章</Button>
					</div>
					<Table bordered dataSource={this.state.dataSource} columns={this.state.columns} pagination={ this.paginationConfig() } />
				</Spin>
			</div>
			)
	}
})
export default ArticalList;