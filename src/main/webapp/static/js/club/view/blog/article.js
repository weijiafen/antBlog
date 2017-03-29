import React from 'react';
import { Row , Col , Breadcrumb ,Button , Pagination , Icon, Modal ,Input } from 'antd';
import moment from 'moment';
import blogService from '../../service/blogService';
import {redirect} from '../../util/function.js';
import _ from 'underscore';
import NormalLoginForm from '../back/component/NormalLoginForm';
var article=React.createClass({
	getInitialState(){
		return {
			userId:this.props.params.userId,
			articalId:this.props.params.articalId,
			data:{},
			comments:null,
			commentTxt:'22'
		}
	},
	componentWillMount:function(){
		let articalId=this.state.articalId
		this.getArtical(this,articalId);
	},
	componentWillReceiveProps:function(object ,nextProps){
		console.log("article",object)
		let articalId=object.params.articalId
		let userId=object.params.userId
		this.setState({
			userId:userId,
			articalId:articalId
		})
		this.getArtical(this,articalId);
	},
	getArtical(ctx,articalId){
		blogService.getArtical(articalId).then((res)=>{
			ctx.setState({
				data:res.data
			})
			// this.changeComments(1)
		})
	},
	changeComentTxt(e){
		//输入时改变commentTxt，这里无法进行Input value与state的绑定
		this.setState({
			commentTxt:e.target.value
		},function(){
			console.log(this.state.commentTxt)
		})
		

	},
	comment(articalId,userId,targetId,targetName){
		var ctx=this;
		var isLogin=window.isLogin;
		console.log(isLogin)
		if(isLogin){
			Modal.info({
				title:'评论',
				onCancel:function(){
					//关闭时清空commentTxt
					ctx.setState({
						commentTxt:''
					})
				},
				onOk:function(){},
				okText:'确定',
				content:<div>
					<Input type="textarea" onChange={ctx.changeComentTxt} autosize={{ minRows: 3, maxRows: 6 }} placeholder={`回复：${targetName}`} />
				</div>
			})
		}else{
			var loginModal=Modal.info({
				title:'需要登录才能评论哦~',
				footer:null,
				okText:'不了不了',
				onCancel:function(){},
				content:<NormalLoginForm onSuccess={this.loginSuccess} onRegister={this.toRegister}/>
			})
			//放到state中，登录成功后可以destroy关闭
			this.setState({
				loginModal:loginModal
			})
		}
		
	},
	agree(){},
	toRegister(){
		this.state.loginModal.destroy();
		redirect('#/register')
	},
	loginSuccess(){
		this.state.loginModal.destroy();
		Modal.info({
			onCancel:function(){},
			title:'success'
		})
	},
	changeComments(page){
		this.setState({
			comments:this.state.data.comments.list.slice((page-1)*10,page*10+1)
		})
	},
	render:function(){
		let articalId=this.props.params.articalId;
		let comments;
		if(this.state.comments==null){
			comments= <div>加载留言中...</div>
		}
		else if(this.state.comments.length!=0){
			comments=<div>
				<div>
					{
						this.state.comments.map((item)=>{
							return <Row key={item.commentId} className="commentsWrap">
									<Col xs={6} md={3}>
										<img src={item.userImg} style={{width:'100%'}}/>
									</Col>
									<Col xs={18} md={21} className="commentBody clearfix">
										<h3 className="commenter">{item.userName}
										</h3>
										<p>{moment(item.createDate).format("YYYY-MM-DD HH:mm:ss")}</p>
										<p className="commentTxt">{item.commentTxt}</p>
										<a>
												<Icon type="like-o"/>
											({item.applaud})</a>
									</Col>
								

								</Row>
						})
					}
				</div>
				<Pagination defaultCurrent={1} total={this.state.data.comments.extra} onChange={this.changeComments}></Pagination>
			</div>
		}
		else{
			comments=<div>本文章暂无留言</div>
		}
		return <section className="">
			<div className="blogBreadcrumb">
				<Breadcrumb>
					<Breadcrumb.Item>
						<a href={`#/blog/${this.state.userId}/${this.state.data.categoryId}`}>
							{this.state.data.categoryName}
						</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						{this.state.data.articalName}
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div className="articalWrap">
				 <h2>{this.state.data.articalName}</h2>
				 <div className="articalInfo">
				 	<span>阅读量：{this.state.data.reading}</span>
				 	<span>创作日期：{moment(this.state.data.createAt).format("YYYY-MM-DD HH:mm:ss")}</span>
				 	<span>最后修改日期：{moment(this.state.data.updateAt).format("YYYY-MM-DD HH:mm:ss")}</span>
				 </div>
				 <div className="articalBody" dangerouslySetInnerHTML={{__html:this.state.data.articalContent}}></div>
				 <div className="articalOperation">
				 	<Button type="primary" onClick={_.partial(this.comment,this.state.articalId,this.state.userId,this.state.userId,this.state.data.author)}>留言</Button>
				 	<a onClick={this.agree}>
				 		<Icon type="like-o" />
				 		({this.state.data.agree})
				 	</a>

				 </div>
				 <div>
				 	<h2>留言</h2>

				 	{comments}
				 </div>
			</div>
		
		</section>
	}
})

export default article;