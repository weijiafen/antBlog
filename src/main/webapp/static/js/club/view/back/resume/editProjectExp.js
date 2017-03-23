import React from 'react';
import {Upload, Icon, message , Button, Input ,Switch , Modal ,Spin } from 'antd'
import backService from '../../../service/backService';
import _ from 'underscore';
import ustr from 'underscore.string';
function beforeUpload(file) {
	console.log(file.type)
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === "image/png"
  if (!isJPG&&!isPNG) {
    message.error('You can only upload JPG or PNG file!');
  }
  const isLt250K = file.size < 250*1024;
  if (!isLt250K) {
    message.error('Image must smaller than 250K!');
  }
  return (isJPG || isPNG) && isLt250K;
}
var editProjectExp=React.createClass({
	getInitialState:function(){
		return {
			loading:true,
			id:0,
			title:'',
			isShow:false,
			backgroundImg:'',
			data:[],
			staticTitle:''//保存header上的title，异步获取到后不再改变
		}
	},
	componentDidMount:function(){
		this.getInitData();
	},
	getInitData:function(){
		backService.getProjectExp().then((res)=>{
			this.setState(res.data)
			this.setState({
				staticTitle:res.data.title,
				loading:false
			})
		})
	},
	changeBackground:function(info){
		if (info.file.status === 'done') {
	      this.setState({backgroundImg:info.file.response.src})
	    }
	},
	toggleShow:function(bool){
		this.setState({
			isShow:bool
		})

	},
	resetBgImage(){
		this.setState({
			backgroundImg:''
		})
	},
	changeItemTitle:function(index,e){
		var data=this.state.data;
		data[index].itemTitle=e.target.value;
		this.setState({
			data:data
		})
	},
	changeKey:function(index,desIndex,e){
		var data=this.state.data;
		data[index].descriptions[desIndex].key=e.target.value;
		this.setState({
			data:data
		})
	},
	
	changeValue:function(index,desIndex,e){
		var data=this.state.data;
		data[index].descriptions[desIndex].value=e.target.value;
		this.setState({
			data:data
		})
	},
	changeText:function(e){
		var className=e.target.className;
		if(className.indexOf("title")>=0){
			this.setState({
				title:e.target.value
			})
		}
	},
	addData:function(){
		var data=this.state.data;
		data.push({
			"id":0,
			"itemTitle":"",
			"descriptions":[
				{
					"id":0,
					"key":"",
					"value":""
				}
			]
		})
		this.setState({
			data:data
		})
	},
	deleteData:function(index,e){
		var ctx=this;
		if(this.state.data[index].id===0){
			Modal.confirm({
				title:'是否确认删除该条数据？',
				onOk(){
					var data=ctx.state.data;
					data.splice(index,1);
					ctx.setState({
						data:data
					})
				}
			})
		}else{
			Modal.confirm({
				title:'删除已保存数据将即刻生效，是否确认删除该条数据？',
				onOk(){
					backService.deleteProjectExpItem(ctx.state.data[index].id).then((res)=>{
						if(res.status===0){
							var data=ctx.state.data;
							data.splice(index,1);
							ctx.setState({
								data:data
							})
						}
						message.info(res.msg)
					})
					
				}
			})
		}
		
		
	},
	addItem:function(index){
		console.log(this.state.data)
		var data=this.state.data;
		data[index].descriptions.push(
				{
					"id":0,
					"key":"",
					"value":""
				}
		)
		this.setState({
			data:data
		})
	},
	deleteItem:function(index,desIndex,e){
		var ctx=this;
		if(this.state.data[index].descriptions[desIndex].id===0){
			Modal.confirm({
				title:'是否确认删除该条数据？',
				onOk(){
					var data=ctx.state.data;
					data[index].descriptions.splice(desIndex,1);
					ctx.setState({
						data:data
					})
				}
			})
		}else{
			Modal.confirm({
				title:'删除已保存数据将即刻生效，是否确认删除该条数据？',
				onOk(){
					backService.deleteProjectExpItemDes(ctx.state.data[index].descriptions[desIndex].id).then((res)=>{
						if(res.status===0){
							var data=ctx.state.data;
							data[index].descriptions.splice(desIndex,1);
							ctx.setState({
								data:data
							})
						}
						message.info(res.msg)
					})
					
				}
			})
		}
	},
	changeColor:function(color){
		this.setState({
			color:color
		})
	},
	editProjectExp:function(){
		if(ustr.trim(this.state.title)===""){
			message.error('标题不能为空！');
			return ;
		}else{
			this.setState({
				loading:true
			})
			backService.setProjectExp(this.state).then((res)=>{
				this.setState({
					loading:false
				})
				message.info(res.msg)
				this.getInitData();
			})
		}
		
	},
	render:function(){
		let ctx=this;
		return (
				<div>
					<Spin spinning={this.state.loading}>
					<header>{this.state.staticTitle}</header>
					<div className="editItem">
						<label>标题名称：</label>
						<Input className="title" value={this.state.title}  onChange={this.changeText}/>
					</div>
					<div className="editItem">
						<label>是否在主页展示：</label>
						<Switch checked={this.state.isShow} onChange={this.toggleShow}/>
					</div>
					<div className="editItem">
						<label>背景图：</label>
						<Upload
					        name="file"
					        showUploadList={false}
					        action="/upload"
					        beforeUpload={beforeUpload}
					        onChange={this.changeBackground} 
					      >
					            
					            <Button type="primary" size='small' >上传新背景图</Button>
					      </Upload>
					      <Button onClick={this.resetBgImage} size="small">
					    	<Icon type="delete" />
					    	</Button>
					    <br/>
						<img src={this.state.backgroundImg} alt="" className="" />
					</div>
					<div className="editItem">
						<label>数据：</label>
						<Button type="primary" size="small" onClick={this.addData}>
							<Icon type="plus"/>
						</Button>
						<div>
							{this.state.data.map(function(item,index){
								return (
									<div key={"project"+index} className="dataItem">
										<Input value={item.itemTitle} onChange={_.partial(ctx.changeItemTitle,index)} />
										<Button size="small" onClick={_.partial(ctx.deleteData,index)}>
											<Icon type="delete" />
										</Button>
										<br/>
										
										<div style={{padding:'15px 30px'}}>
											<label>描述：</label>
											<Button type="primary" size="small" onClick={_.partial(ctx.addItem,index)}>
												<Icon type="plus"/>
											</Button>
											{
												item.descriptions.map(function(desItem,desIndex){
													return (
															<div key={"descriptions"+index+desIndex} className="dataItemDes">
																<Input value={desItem.key} onChange={_.partial(ctx.changeKey,index,desIndex)} />
																<Input value={desItem.value} onChange={_.partial(ctx.changeValue,index,desIndex)}/>
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
					<Button type="primary" onClick={this.editProjectExp} >保存</Button>
					</Spin>
				</div>
			)
	}
})
export default editProjectExp