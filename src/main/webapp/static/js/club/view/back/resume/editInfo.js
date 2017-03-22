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
var editInfo=React.createClass({
	getInitialState:function(){
		return {
			title:'',
			isShow:false,
			img:'',
			backgroundImg:'',
			data:[],
			staticTitle:''//保存header上的title，异步获取到后不再改变
		}
	},
	componentDidMount:function(){
		backService.getPersonalInfo().then((res)=>{
			this.setState(res.data)
			this.setState({staticTitle:res.data.title})
		})
	},
	changeBackground:function(info){
		if (info.file.status === 'done') {
	      this.setState({backgroundImg:info.file.response.src})
	    }
	},
	changeImage:function(info){
		if (info.file.status === 'done') {
	      this.setState({img:info.file.response.src})
	    }
	},
	toggleShow:function(bool){
		this.setState({
			isShow:bool
		})

	},
	changeKey:function(index,e){
		var data=this.state.data;
		data[index].key=e.target.value;
		this.setState({
			data:data
		})
	},
	
	changeValue:function(index,e){
		var data=this.state.data;
		data[index].value=e.target.value;
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
			key:'',
			value:''
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
	editPersonalInfo:function(){
		if(ustr.trim(this.state.title)===""){
			message.error('标题不能为空！');
			return ;
		}else{
			backService.setPersonalInfo(this.state).then((res)=>{
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
						<label>配图：</label>
						<Upload
					        name="file"
					        showUploadList={false}
					        action="/upload"
					        beforeUpload={beforeUpload}
					        onChange={this.changeImage} 
					      >
					            
					            <Button type="primary" size='small' >上传新配图</Button>
					      </Upload>
					    <br/>
						<img src={this.state.img} alt="" className="" />
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
									<div key={item.key+index}>
										<Input value={item.key} onChange={_.partial(ctx.changeKey,index)} />：
										<Input value={item.value} onChange={_.partial(ctx.changeValue,index)}/>
										<Button size="small" onClick={_.partial(ctx.deleteData,index)}>
											<Icon type="delete" />
										</Button>
									</div>
									)
							})}
						</div>
					</div>
					<Button type="primary" onClick={this.editPersonalInfo} >保存</Button>
				</div>
			)
	}
})
export default editInfo