import React from 'react';
import {Upload, Icon, message , Button, Input ,Switch , Modal ,Spin ,Row , Col } from 'antd'
import competitionService from '../../../service/back/competitionService';
import _ from 'underscore';
import ustr from 'underscore.string';
import ColorPickerComp from '../component/colorPickerComp';
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
var editCompetition=React.createClass({
	getInitialState:function(){
		return {
			loading:true,
			id:0,
			title:'',
			isShow:false,
			backgroundImg:'',
			color:'',
			data:[],
			staticTitle:''//保存header上的title，异步获取到后不再改变
		}
	},
	componentDidMount:function(){
		this.getInitData();
	},
	getInitData:function(){
		competitionService.getCompetitions().then((res)=>{
			this.setState(res.data)
			this.setState({
				staticTitle:res.data.title,
				loading:false
			})
		})
	},
	changeColor:function(color){
		this.setState({
			color:color
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
	changeItemImg:function(index,info){
		if (info.file.status === 'done') {
	    	// this.setState({backgroundImg:info.file.response.src})
	    	var data=this.state.data;
			data[index].itemImg=info.file.response.src;
			this.setState({
				data:data
			})
	    }
		
	},
	changeItemDate:function(index,e){
		var data=this.state.data;
		data[index].itemDate=e.target.value;
		this.setState({
			data:data
		})
	},
	changeItemTxt:function(index,e){
		var data=this.state.data;
		data[index].itemTxt=e.target.value;
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
			"itemImg":"",
			"itemDate":"",
			"itemTxt":""
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
					competitionService.deleteCompetitionsItem(ctx.state.data[index].id).then((res)=>{
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
	changeColor:function(color){
		this.setState({
			color:color
		})
	},
	editCompetition:function(){
		if(ustr.trim(this.state.title)===""){
			message.error('标题不能为空！');
			return ;
		}else{
			this.setState({
				loading:true
			})
			competitionService.setCompetitions(this.state).then((res)=>{
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
					<Row>
						<Col sm={24} md={8}>
							<div className="editItem">
								<label>标题名称：</label>
								<Input className="title" value={this.state.title}  onChange={this.changeText}/>
							</div>
							<div className="editItem">
								<label>是否在主页展示：</label>
								<Switch checked={this.state.isShow} onChange={this.toggleShow}/>
							</div>
							<ColorPickerComp
								color={this.state.color}
								callback={this.changeColor}
							/>
							<div className="editItem">
								<label>数据：</label>
								<Button type="primary" size="small" onClick={this.addData}>
									<Icon type="plus"/>
								</Button>
								<div>
									{this.state.data.map(function(item,index){
										return (
											<div key={"work"+index} className="dataItem">
												条目副标题：<Input value={item.itemDate} onChange={_.partial(ctx.changeItemDate,index)} />
												条目描述：<Input value={item.itemTxt} autosize={{ minRows: 2, maxRows: 6 }}
												 onChange={_.partial(ctx.changeItemTxt,index)} />
												 条目图片：<img src={item.itemImg} className="itemImage"/>
												 <Upload
											        name="file"
											        showUploadList={false}
											        action="/upload"
											        beforeUpload={beforeUpload}
											        onChange={_.partial(ctx.changeItemImg,index)}
											      >
											            
											            <Button type="primary" size='small' >上传图片</Button>
											      </Upload>
												<Button size="small" onClick={_.partial(ctx.deleteData,index)}>
													<Icon type="delete" />
												</Button>
												<br/>
											</div>
											)
									})}
								</div>
							</div>
						</Col>
					</Row>
					
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
					
					<Button type="primary" onClick={this.editCompetition} >保存</Button>
					</Spin>
				</div>
			)
	}
})
export default editCompetition