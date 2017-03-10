import React from 'react';
import { Row , Col , Breadcrumb ,Button , Pagination , Icon } from 'antd';
import moment from 'moment';
import blogService from '../../service/blogService';
var article=React.createClass({
	getInitialState(){
		return {
			userId:this.props.params.userId,
			typeId:this.props.params.typeId,
			articleId:this.props.params.articleId,
			data:{},
			comments:null
		}
	},
	componentWillMount:function(){
		let typeId=this.state.typeId;
		let userId=this.state.userId;
		let articleId=this.state.articleId
		this.getArtical(this,userId,typeId,articleId);
	},
	componentWillReceiveProps:function(object ,nextProps){
		console.log("article",object)
		let typeId=object.params.typeId;
		let userId=object.params.userId;
		let articleId=object.params.articleId
		this.setState({
			userId:userId,
			typeId:typeId,
			articleId:articleId
		})
		this.getArtical(this,userId,typeId,articleId);
	},
	getArtical(ctx,userId,typeId,articleId){
		blogService.getArtical(userId,typeId,articleId).then((res)=>{
			ctx.setState({
				userId:userId,
				data:res.data
			})
			this.changeComments(1)
		})
	},
	changeComments(page){
		this.setState({
			comments:this.state.data.comments.list.slice((page-1)*10,page*10+1)
		})
	},
	render:function(){
		let articleId=this.props.params.articleId;
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
						<a href={`#/blog/${this.state.userId}/${this.state.typeId}`}>
							{this.state.data.typeName}
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
				 	<span>作者：{this.state.data.author}</span>
				 	<span>阅读量：{this.state.data.reading}</span>
				 	<span>创作日期：{moment(this.state.data.createDate).format("YYYY-MM-DD HH:mm:ss")}</span>
				 	<span>最后修改日期：{moment(this.state.data.updateDate).format("YYYY-MM-DD HH:mm:ss")}</span>
				 </div>
				 <div className="articalBody" dangerouslySetInnerHTML={{__html:this.state.data.articalContent}}></div>
				 <div className="articalOperation">
				 	<Button type="primary">留言</Button>
				 	<a>
				 	<Icon type="like-o" />
				 	({this.state.data.applaud})</a>

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