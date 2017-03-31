import React from 'react';
import { Icon , Button  , Modal ,Spin   } from 'antd'
import backService from '../../../service/backService';
import moment from 'moment';
import _ from 'underscore'
var message=React.createClass({
	getInitialState(){
		return {
			agree:[],
			comments:[],
			loading:true
		}
	},
	componentDidMount(){
		backService.getMessageList().then((res)=>{
			this.setState({
				loading:false,
				agree:res.data.agreeList,
				comments:res.data.commentList
			})
		})
	},
	render(){
		return (
			<div>
			<Spin spinning={this.state.loading}>
				<header>评论：</header>
				<div>
					{this.state.comments.map(function(item){
						return (<div className="commentItem" key={"comment"+item.id} dangerouslySetInnerHTML={{__html:`
							<p>${moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")}</p>
							<p>${item.userName}在${item.type===2?'':'你的文章'}
								<a href='/#/blog/${item.authorId}/${item.categoryId}/${item.articalId}'>《${item.articalName}》
								</a>
								中的回复：
							</p>
							<p>${item.content}</p>
								`}}>
							</div>)
					})}
				</div>
				<header>点赞：</header>
				<div>
					{this.state.agree.map(function(item){
						return (<div className="agreeItem" key={"agree"+item.id} dangerouslySetInnerHTML={{__html:`
							<p>${moment(item.createAt).format("YYYY-MM-DD HH:mm:ss")}</p>
							<p>${item.userName}在你的文章
								<a href='/#/blog/${item.authorId}/${item.categoryId}/${item.articalId}'>《${item.articalName}》
								</a>
								中给你点了赞</p>`}}>
							</div>)
					})}
				</div>
			</Spin>
			</div>
			)
	}
})
export default message