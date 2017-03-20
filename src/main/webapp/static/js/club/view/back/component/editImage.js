import React from 'react'
import Cropper from 'react-cropper';
import { Button , Spin , message } from 'antd';
import backService from '../../../service/backService'; 
import 'cropperjs/dist/cropper.css';
class EditImage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      image:null,
      uploading:false
    }
  }
  _crop(){
    
  }
  click(){
    try{
      var dataurl=this.refs.cropper.getCroppedCanvas().toDataURL()
      var blob = this.dataURLtoBlob(dataurl);
      var fd = new FormData();
      fd.append("file", blob, "image.png");
      // backService.upload(fd);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);
      xhr.send(fd);
      this.props.callback(this.state.image);
    }
    catch(e){
      console.log(e)
      message.error('未选择图片')
    }
  }
  dataURLtoBlob(dataurl){
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }
  changeImage(e){
     e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ image: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }
  render() {
    return (
      <div style={{width:'300px'}}>
        <input type="file" onChange={this.changeImage.bind(this)} />
        <Cropper
          ref='cropper'
          src={this.state.image}
          style={{height:300, width:'100%'}}
          // Cropper.js options
          aspectRatio={1 / 1}
          guides={false}
          />
          <Button onClick={this.props.callback}>cancel</Button>
          <Spin spinning={this.state.uploading}>
            <Button type="primary" onClick={this.click.bind(this)}>ok</Button>
          </Spin>
          <img src={this.state.image}/>

      </div>
    );
  }
}

export default EditImage