import React from 'react';
import {Upload, Icon, message , Button, Input} from 'antd'
import backService from '../../../service/backService'; 
import EditImage from '../component/editImage';
import ColorPickerComp from '../component/colorPickerComp';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
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

var editTop=React.createClass({
	getInitialState:function(){
		return {
			imageUrl:'',
			backgroundImageUrl:'',
			editImage:false,
			color:'#000'
		}
	},
	componentDidMount:function(){
		backService.getTop().then((res)=>{
			console.log(res);
		})
	},
	confirmImage:function(imageUrl){
		this.setState({
			editImage:!this.state.editImage
			
		})
		console.log('imageUrl',typeof imageUrl);
		if(typeof imageUrl==="string"&&imageUrl!==""){
			this.setState({
				imageUrl:imageUrl
			})
			console.log('imageUrl2',imageUrl);

		}
	},
	changeColor:function(color){
		this.setState({
			color:color
		})
	},
	changeImage:function(info){
		if (info.file.status === 'done') {
	      // Get this url from response in real world.
	      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
	    }
	},
	changeBackground:function(info){
		if (info.file.status === 'done') {
	      // Get this url from response in real world.
	      getBase64(info.file.originFileObj, backgroundImageUrl => this.setState({ backgroundImageUrl }));
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
				<header>基础资料</header>
				<div className="editItem">
					<label>头像：</label>
					<Button type="primary" size='small' onClick={this.confirmImage}>修改</Button>
					<br/>
					<img src={this.state.imageUrl} className="editTopImage"/>
					
				</div>
				<div className="editItem">
					<label>用户名：</label>
					<Input type="text"/>
					
				</div>
				<div className="editItem">
					<label>个性签名：</label>
					<Input type="text"/>
					
				</div>
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
				    <br/>
					<img src={this.state.backgroundImageUrl} alt="" className="" />
				</div>
			   	<Button type="primary" >保存</Button>
			      
			</div>
			)
		)
	}
})

export default editTop;