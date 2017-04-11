import React from 'react';
import {Upload, Icon, message , Button, Input ,Switch , Modal ,Spin ,Select ,Row , Col} from 'antd'
import skillService from '../../../service/back/skillService';
import {partial} from 'underscore';
import {trim} from 'underscore.string';
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
var editSkills=React.createClass({
	getInitialState:function(){
		return {
			loading:true,
			title:'',
			isShow:false,
			img:'',
			backgroundImg:'',
			data:[],
			color:'',
			staticTitle:''//保存header上的title，异步获取到后不再改变
		}
	},
	componentDidMount:function(){
		this.getInitData();
	},
	getInitData:function(){
		skillService.getSkills().then((res)=>{
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
	
	changeValue:function(index,value){
		var data=this.state.data;
	    data[index].value=value;
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
	resetBgImage(){
		this.setState({
			backgroundImg:''
		})
	},
	resetImage(){
		this.setState({
			img:''
		})
	},
	changeColor:function(color){
		this.setState({
			color:color
		})
	},
	editSkills:function(){
		if(trim(this.state.title)===""){
			message.error('标题不能为空！');
			return ;
		}else{
			this.setState({
				loading:true
			})
			skillService.setSkills(this.state).then((res)=>{
				this.getInitData();
				this.setState({
					loading:false
				})
				message.info(res.msg)
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
						<Col sm={24} md={6}>
							<div className="editItem">
								<label>标题名称：</label>
								<Input className="title" value={this.state.title}  onChange={this.changeText}/>
							</div>
						</Col>
					</Row>
					
					<div className="editItem">
						<label>是否在主页展示：</label>
						<Switch checked={this.state.isShow} onChange={this.toggleShow}/>
					</div>
					<ColorPickerComp
						color={this.state.color}
						callback={this.changeColor}
					/>
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
					      <Button onClick={this.resetImage} size="small">
					    	<Icon type="delete" />
					    	</Button>
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
									<div key={"skills"+index} className="dataItem">
										
										<Row>
											<Col sm={24} md={10}>
												<Row>
													<Col xs={14}><Input value={item.key} onChange={partial(ctx.changeKey,index)} /></Col>
													<Col xs={6}>
														<Select onChange={partial(ctx.changeValue,index)} value={item.value} style={{ width: "100%" }}>
															<Select.Option value="1">1</Select.Option>
															<Select.Option value="2">2</Select.Option>
															<Select.Option value="3">3</Select.Option>
															<Select.Option value="4">4</Select.Option>
															<Select.Option value="5">5</Select.Option>
														</Select>
													</Col>
													<Col xs={4}>
														<Button size="small" onClick={partial(ctx.deleteData,index)}>
															<Icon type="delete" />
														</Button>
													</Col>
												</Row>
											</Col>
										</Row>
									</div>
									)
							})}
						</div>
					</div>
					<Button type="primary" onClick={this.editSkills} >保存</Button>
				</Spin>
				</div>
			)
	}
})
export default editSkills