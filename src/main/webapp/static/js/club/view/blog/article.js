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
			agree:0,
			comments:null,
			commentTxt:'',
			//评论分页
			pageSize:10,
			pageNum:1
		}
	},
	componentWillMount:function(){
		let articalId=this.state.articalId
		this.getArtical(this,articalId);
		this.getComments(this,articalId);
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
		this.getComments(this,articalId);
	},
	getArtical(ctx,articalId){
		blogService.getArtical(articalId).then((res)=>{
			ctx.setState({
				data:res.data,
				agree:res.data.agree
			})
			// this.changeComments(1)
		})
	},
	getComments(ctx,articalId){
		blogService.getComments({
			articalId:articalId,
			pageSize:this.state.pageSize,
			pageNum:this.state.pageNum
		}).then((res)=>{
			ctx.setState({
				comments:res.data.commentList,
				total:res.data.total
			})
		})
	},
	changeComentTxt(e){
		//输入时改变commentTxt，这里无法进行Input value与state的绑定
		this.setState({
			commentTxt:e.target.value
		})
		

	},
	comment(type,articalId,authorId,targetId,targetName,commentId){
		//type:0直接留言；1回复留言
		//commentId:type为1时需要传入回复哪条评论
		var ctx=this;
		var isLogin=window.isLogin;
		if(isLogin){
			Modal.confirm({
				title:'评论',
				onCancel:function(){
					//关闭时清空commentTxt
					ctx.setState({
						commentTxt:''
					})
				},
				onOk:function(){
					var content=ctx.state.commentTxt;
					if(content.replace(/\s/g,"")===""){
						Modal.error({
							title:'内容不能为空！',
							onCancel:function(){}
						})
						return ;
					}
					if(type){
						content=`${content}//<a>@${targetName}</a>回复：`
					}else{
						commentId=undefined
					}
					blogService.setComment({
						articalId:articalId,
						authorId:authorId,
						targetId:targetId,
						targetName:targetName,
						content:content,
						type:type,
						commentId:commentId
					}).then((res)=>{
						Modal.info({
							title:res.msg,
							onCancel:function(){}
						})
						ctx.setState({
							pageNum:1
						},function(){
							ctx.getComments(ctx,articalId)
						})
						
					})
				},
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
	agree(e){
		var isLogin=window.isLogin;
		var ctx=this;
		if(isLogin){
			ctx.refs.agreeBtn.setAttribute("disabled",true);
			blogService.agree({articalId:ctx.state.articalId}).then((res)=>{
				if(res.status===0){
					Modal.success({
						title:res.msg,
						onCancel(){}
					})
					var num=ctx.state.agree+1
					ctx.setState({
						agree:num
					})
				}else{
					Modal.error({
						title:res.msg,
						onCancel(){}
					})
				}
			})
			
			// e.target.innerHTML=1
		}else{
			var loginModal=Modal.info({
				title:'需要登录才能点赞哦~',
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
	toRegister(){
		this.state.loginModal.destroy();
		redirect('#/register')
	},
	loginSuccess(){
		this.state.loginModal.destroy();
		Modal.info({
			onCancel:function(){},
			title:'登录成功'
		})
	},
	changeComments(page){
		var ctx=this;
		this.setState({
			pageNum:page
		},function(){
			ctx.getComments(ctx,ctx.state.articalId);
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
							return <Row key={"comment"+item.id} className="commentsWrap">
									<Col xs={6} md={3}>
										<img src={item.img} style={{width:'100%'}}/>
									</Col>
									<Col xs={18} md={21} className="commentBody clearfix">
										<h3 className="commenter">{item.userName}
										</h3>
										<p>{moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")}</p>
										<p className="commentTxt" dangerouslySetInnerHTML={{__html:item.content}}></p>
										<a onClick={_.partial(this.comment,1,item.articalId,item.authorId,item.userId,item.userName,item.id)}>
												回复
											</a>
									</Col>
								

								</Row>
						})
					}
				</div>
				<Pagination current={this.state.pageNum} defaultCurrent={1} total={this.state.total} onChange={this.changeComments}></Pagination>
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
				 	<Button type="primary" onClick={_.partial(this.comment,0,this.state.articalId,this.state.userId,this.state.userId,this.state.data.author)}>留言</Button>
				 	<a onClick={this.agree} ref="agreeBtn">
				 		<Icon type="like-o" />
				 		({this.state.agree})
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