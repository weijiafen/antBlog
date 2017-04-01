import React from 'react';
import { Icon , Button  , Modal ,Spin , Pagination ,Input   } from 'antd'
import backService from '../../../service/backService';
import blogService from '../../../service/blogService';
import moment from 'moment';
import _ from 'underscore'
var message=React.createClass({
	getInitialState(){
		return {
			agree:[],
			comments:[],
			loading:true,
			pageSize:10,
			pageNum:1,
			total:0,
			commentTxt:''
		}
	},
	componentDidMount(){
		backService.getMessageList({
			pageSize:this.state.pageSize,
			pageNum:this.state.pageNum
		}).then((res)=>{
			this.setState({
				loading:false,
				agree:res.data.agreeList,
				comments:res.data.commentList,
				total:res.data.total
			})
		})
	},
	changePage(current){
		this.setState({
			pageNum:current,
			loading:true
		},function(){
			backService.getMessageList({
				pageSize:this.state.pageSize,
				pageNum:this.state.pageNum
			}).then((res)=>{
				this.setState({
					loading:false,
					comments:res.data.commentList,
					total:res.data.total
				})
			})
		})
	},
	comment(type,articalId,authorId,targetId,targetName,commentId){
		//type:0直接留言；1回复留言
		//commentId:type为1时需要传入回复哪条评论
		var ctx=this;
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
	},
	changeComentTxt(e){
		//输入时改变commentTxt，这里无法进行Input value与state的绑定
		this.setState({
			commentTxt:e.target.value
		})
	},
	render(){
		var ctx=this;
		return (
			<div>
			<Spin spinning={this.state.loading}>
				<header>点赞：</header>
				<div>
					{this.state.agree.map(function(item){
						return (<div className="agreeItem" key={"agree"+item.id} dangerouslySetInnerHTML={{__html:`
							<p>${moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")}</p>
							<p><a href='/#/home/${item.userId}'>${item.userName}</a>在你的文章
								<a href='/#/blog/${item.authorId}/${item.categoryId}/${item.articalId}'>《${item.articalName}》
								</a>
								中给你点了赞</p>`}}>
							</div>)
					})}
					{this.state.agree.length===0?'暂无数据':''}
				</div>
				<header>评论(一周内)：</header>
				<div>
					{this.state.comments.map(function(item){
						return (<div className="commentItem" key={"comment"+item.id} >
							<p>{moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")}</p>
							<p><a href='/#/home/${item.userId}'>{item.userName}</a>在{item.type===2?'':'你的文章'}
								<a href={`/#/blog/${item.authorId}/${item.categoryId}/${item.articalId}`}>《{item.articalName}》
								</a>
								中的回复：
							</p>
							<p style={{display:'inline-block',lineHeight:'2.4'}} dangerouslySetInnerHTML={{__html:item.content}} ></p>
								<Button className='reply' size="small" 
								onClick={_.partial(ctx.comment,1,item.articalId,item.authorId,item.userId,item.userName,item.id)}>
								回复</Button>
							</div>)
					})}
					{this.state.comments.length===0?'暂无数据':''}
					<Pagination total={this.state.total} onChange={this.changePage}/>
				</div>
				
			</Spin>
			</div>
			)
	}
})
export default message