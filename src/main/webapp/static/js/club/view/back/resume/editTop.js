import React from 'react';
import {Upload, Icon, message , Button} from 'antd'
import backService from '../../../service/backService'; 
import EditImage from '../component/editImage';
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
  const isLt200K = file.size < 200*1024;
  if (!isLt200K) {
    message.error('Image must smaller than 200K!');
  }
  return isJPG && isLt200K;
}

var back=React.createClass({
	getInitialState:function(){
		return {
			imageUrl:'',
			backgroundImageUrl:'',
			editImage:false
		}
	},
	confirmImage:function(imageUrl){
		this.setState({
			editImage:!this.state.editImage
			
		})
		if(imageUrl){
			this.setState({
				imageUrl:imageUrl
			})
		}
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
			<div className="backContainer">
				头像：
				<Button type="primary" onClick={this.confirmImage}>修改</Button>
			      背景图:
			      <img src={this.state.backgroundImageUrl} alt="" className="avatar" />
			      <Upload
			        className="avatar-uploader"
			        name="file"
			        showUploadList={false}
			        action="/upload"
			        beforeUpload={beforeUpload}
			        onChange={this.changeBackground} 
			      >
			            
			            <Icon type="upload" className="avatar-uploader-trigger" />
			      </Upload>
			</div>
			)
		)
	}
})

export default back;