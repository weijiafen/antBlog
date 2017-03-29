import React from 'react'
import Cropper from 'react-cropper';
import { Button , Spin , message } from 'antd';
import backService from '../../../service/backService'; 
import 'cropperjs/dist/cropper.css';
function getRandomFileName(){
  var pool=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
  var fileName="";
  for(let i of pool){
    fileName+=pool[parseInt(Math.random()*16)]
  }
  return fileName;
}
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
      var ctx=this;
      this.setState({
        uploading:true
      })
      var dataurl=this.refs.cropper.getCroppedCanvas().toDataURL()
      var blob = this.dataURLtoBlob(dataurl);
      var fd = new FormData();
      //生成一个16位的16进制数作为随机文件名
      fd.append("file", blob, getRandomFileName()+".jpg");
      // backService.upload(fd);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          if(xhr.status==200){
            console.log('response',xhr.responseText)
            window.xhr=xhr
            var res=JSON.parse(xhr.responseText);
            ctx.setState({
              uploading:false
            })
            ctx.props.callback(res.src);
          }else{
            ctx.setState({
              uploading:false
            })
          }
        }
      }
      xhr.send(fd);
      
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
        <br/>
        <Cropper
          ref='cropper'
          src={this.state.image}
          style={{height:300, width:'100%',border:'1px solid #aaa'}}
          // Cropper.js options
          aspectRatio={1 / 1}
          guides={false}
          />
          <br/>
          <Spin spinning={this.state.uploading}>
            <Button onClick={this.props.callback}>cancel</Button>
            <Button type="primary" onClick={this.click.bind(this)}>ok</Button>
          </Spin>

      </div>
    );
  }
}

export default EditImage