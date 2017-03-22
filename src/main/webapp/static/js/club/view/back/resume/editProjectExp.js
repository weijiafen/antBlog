import React from 'react';
import {Upload, Icon, message , Button, Input ,Switch , Modal } from 'antd'
import backService from '../../../service/backService';
import _ from 'underscore';
import ustr from 'underscore.string';
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt250K = file.size < 250*1024;
  if (!isLt250K) {
    message.error('Image must smaller than 250K!');
  }
  return isJPG && isLt250K;
}
var editProjectExp=React.createClass({
	getInitialState:function(){
		return {
			title:'',
			isShow:false,
			backgroundImg:'',
			data:[{
					"id":1,
					"itemTitle":"项目：广药校团委官网",
					"descriptions":[
						{
							"id":1,
							"key":"项目描述：",
							"value":"广东药科大学校团委官网，主要用于下发文件通知，发布学校新闻动态"
						},
						{
							"id":2,
							"key":"主要职责：",
							"value":"使用HTML+CSS+Jquery高度还原设计稿"
						}
					]
				}],
			staticTitle:''//保存header上的title，异步获取到后不再改变
		}
	},
	componentDidMount:function(){
		// backService.getSkills().then((res)=>{
		// 	this.setState(res.data)
		// 	this.setState({staticTitle:res.data.title})
		// })
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
		
	},
	changeColor:function(color){
		this.setState({
			color:color
		})
	},
	editSkills:function(){
		if(ustr.trim(this.state.title)===""){
			message.error('标题不能为空！');
			return ;
		}else{
			backService.setSkills(this.state).then((res)=>{
				message.info(res.msg)
			})
		}
		
	},
	render:function(){
		let ctx=this;
		return (
				<div>
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
									<div key={item.itemTitle+index}>
										<Input value={item.itemTitle} onChange={_.partial(ctx.changeItemTitle,index)} />
										<Button size="small" onClick={_.partial(ctx.deleteData,index)}>
											<Icon type="delete" />
										</Button>
										<br/>
										
										<div style={{padding:'20px'}}>
											<label>描述：</label>
											<Button type="primary" size="small" onClick={_.partial(ctx.addItem,index)}>
												<Icon type="plus"/>
											</Button>
											{
												item.descriptions.map(function(desItem,desIndex){
													return (
															<div key={desItem.key+desIndex}>
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
					<Button type="primary" onClick={this.editSkills} >保存</Button>
				</div>
			)
	}
})
export default editProjectExp