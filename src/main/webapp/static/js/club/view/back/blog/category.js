import React from 'react';
import { Icon, message , Button, Input  , Modal ,Spin ,Row ,Col } from 'antd'
import categoryService from '../../../service/back/categoryService';
import _ from 'underscore';
// import ustr from 'underscore.string';
var editCategory=React.createClass({
	getInitialState:function(){
		return {
			loading:true,
			menus:[]
		}
	},
	componentDidMount:function(){
		this.getInitData();
	},
	getInitData:function(){
		categoryService.getCategory().then((res)=>{
			if(res.status===0){
				this.setState({menus:res.data.menus})
			}
			this.setState({
				loading:false
			})
		})
	},
	changeItemTitle:function(index,e){
		var menus=this.state.menus;
		menus[index].menuName=e.target.value;
		this.setState({
			menus:menus
		})
	},
	changeKey:function(index,desIndex,e){
		var menus=this.state.menus;
		menus[index].children[desIndex].categoryName=e.target.value;
		this.setState({
			menus:menus
		})
	},
	addData:function(){
		var menus=this.state.menus;
		menus.push({
			"id":0,
			"menuName":"",
			"children":[
				{
					"id":0,
					"categoryName":""
				}
			]
		})
		this.setState({
			menus:menus
		})
	},
	deleteData:function(index,e){
		var ctx=this;
		if(this.state.menus[index].id===0){
			Modal.confirm({
				title:'是否确认删除该条数据？',
				onOk(){
					var menus=ctx.state.menus;
					menus.splice(index,1);
					ctx.setState({
						menus:menus
					})
				}
			})
		}else{
			Modal.confirm({
				title:'删除已保存数据将即刻生效，是否确认删除该条数据？',
				onOk(){
					categoryService.deleteMenu(ctx.state.menus[index].id).then((res)=>{
						if(res.status===0){
							var menus=ctx.state.menus;
							menus.splice(index,1);
							ctx.setState({
								menus:menus
							})
						}
						message.info(res.msg)
					})
					
				}
			})
		}
		
		
	},
	addItem:function(index){
		var menus=this.state.menus;
		menus[index].children.push(
				{
					"id":0,
					"categoryName":""
				}
		)
		this.setState({
			menus:menus
		})
	},
	deleteItem:function(index,desIndex,e){
		var ctx=this;
		if(this.state.menus[index].children[desIndex].id===0){
			Modal.confirm({
				title:'是否确认删除该条数据？',
				onOk(){
					var menus=ctx.state.menus;
					menus[index].children.splice(desIndex,1);
					ctx.setState({
						menus:menus
					})
				}
			})
		}else{
			Modal.confirm({
				title:'删除已保存数据将即刻生效，是否确认删除该条数据？',
				onOk(){
					categoryService.deleteCategory(ctx.state.menus[index].children[desIndex].id).then((res)=>{
						if(res.status===0){
							var menus=ctx.state.menus;
							menus[index].children.splice(desIndex,1);
							ctx.setState({
								menus:menus
							})
						}
						message.info(res.msg)
					})
					
				}
			})
		}
	},
	editCategory:function(){
		
		this.setState({
			loading:true
		})
		categoryService.setCategory(this.state).then((res)=>{
			this.setState({
				loading:false
			})
			message.info(res.msg)
			this.getInitData();
		})
	},
	render:function(){
		let ctx=this;
		return (
				<div>
					<Spin spinning={this.state.loading}>
					<header>管理分类</header>
					<Row>
						<Col sm={24} md={8}>
							<div className="editItem">
								<label>一级菜单：</label>
								<Button type="primary" size="small" onClick={this.addData}>
									<Icon type="plus"/>
								</Button>
								<div>
									{this.state.menus.map(function(item,index){
										return (
											<div key={"menu"+index} className="dataItem">
												<Input value={item.menuName} onChange={_.partial(ctx.changeItemTitle,index)} />
												<Button size="small" onClick={_.partial(ctx.deleteData,index)}>
													<Icon type="delete" />
												</Button>
												<br/>
												
												<div style={{padding:'15px 30px'}}>
													<label>二级菜单：</label>
													<Button type="primary" size="small" onClick={_.partial(ctx.addItem,index)}>
														<Icon type="plus"/>
													</Button>
													{
														item.children.map(function(desItem,desIndex){
															return (
																	<div key={"descriptions"+index+desIndex} className="dataItemDes">
																		<Input value={desItem.categoryName} onChange={_.partial(ctx.changeKey,index,desIndex)} />
																		<Button size="small" onClick={_.partial(ctx.deleteItem,index,desIndex)}>
																			<Icon type="delete" />
																		</Button>
																	</div>
																)
														})
													}
												</div>
												
											</div>
											)
									})}
								</div>
							</div>
						</Col>
					</Row>
					
					<Button type="primary" onClick={this.editCategory} >保存</Button>
					</Spin>
				</div>
			)
	}
})
export default editCategory