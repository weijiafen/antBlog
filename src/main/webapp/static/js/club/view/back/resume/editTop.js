import React from 'react';
import {Upload, Icon, message , Button, Input , Spin , Row , Col} from 'antd'
import topService from '../../../service/back/topService';
import EditImage from '../component/editImage';
import ColorPickerComp from '../component/colorPickerComp';
import PubSub from 'pubsub-js';
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

var editTop=React.createClass({
	getInitialState:function(){
		return {
			loading:true,
			img:'',
			backgroundImg:'',
			editImage:false,
			introduce:'',
			color:''
		}
	},
	componentDidMount:function(){
		topService.getTop().then((res)=>{
			this.setState(res.data)
			this.setState({
				loading:false
			})
		})
	},
	confirmImage:function(img){
		this.setState({
			editImage:!this.state.editImage
			
		})
		console.log('img',typeof img);
		if(typeof img==="string"&&img!==""){
			this.setState({
				img:img
			})
			console.log('imageUrl2',img);

		}
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
	editTop:function(){
		this.setState({
			loading:true
		})
		topService.setTop(this.state).then((res)=>{
			this.setState({
				loading:false
			})
			PubSub.publish('reloadInfo')
			message.info(res.msg)
		})
	},
	resetBgImage(){
		this.setState({
			backgroundImg:''
		})
	},
	changeText:function(e){
		var className=e.target.className;
		if(className.indexOf("userName")>=0){
			this.setState({
				userName:e.target.value
			})
		}
		else if(className.indexOf("introduce")>=0){
			this.setState({
				introduce:e.target.value
			})
		}
	},
	render:function(){
		return (
			this.state.editImage?(
				<EditImage callback={this.confirmImage}/>
				)
			:
			(
			<div>
			<Spin spinning={this.state.loading}>
				<header>基础资料</header>
				<div className="editItem">
					<label>头像：</label>
					<Button type="primary" size='small' onClick={this.confirmImage}>修改</Button>
					<br/>
					<img src={this.state.img} className="editTopImage"/>
					
				</div>
				<Row>
					<Col sm={24} md={6}>
						<div className="editItem">
							<label>用户名：</label>
							<Input type="text" className="userName" value={this.state.userName} onChange={this.changeText}/>
							
						</div>
						<div className="editItem">
							<label>个性签名：</label>
							<Input type="text" className="introduce" value={this.state.introduce} onChange={this.changeText}/>
							
						</div>
					</Col>
				</Row>
				
				<ColorPickerComp
					color={this.state.color}
					callback={this.changeColor}
				/>
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
			   	<Button type="primary" onClick={this.editTop} >保存</Button>
			</Spin>
			</div>
			)
		)
	}
})

export default editTop;