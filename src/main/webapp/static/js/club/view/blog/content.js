import React from 'react';
import { Row , Col , Breadcrumb , Icon} from 'antd';
import blogService from '../../service/blogService';
import moment from 'moment';
var content=React.createClass({
	getInitialState:function(){
		return {
			typeName:"",
			list:null,
			typeId:this.props.params.typeId,
			userId:this.props.params.userId
		}
	},
	componentWillMount:function(){
		let typeId=this.state.typeId;
		let userId=this.state.userId;
		this.getList(this,userId,typeId);
	},
	componentWillReceiveProps:function(object ,nextProps){
		let typeId=object.params.typeId;
		let userId=object.params.userId;
		this.setState({
			userId:userId,
			typeId:typeId
		})
		this.getList(this,userId,typeId);
	},
	getList:(ctx,userId,typeId)=>{
		//ctx:需要把作用域传过来设置state
		blogService.getList(userId,typeId).then((res)=>{
			ctx.setState({
				typeName:res.data.typeName,
				list:res.data.list
			})
		})
	},
	render:function(){
		let blogList;
		if(this.state.list===null){
			blogList=<div className="blogList">loading</div>
		}
		else if(this.state.list.length===0){
			blogList= <div  className="blogList">暂无文章</div>
		}
		else{
			blogList=(<div  className="blogList">
			{
				this.state.list.map((item)=>{
					return <div className="blogItem clearfix" key={item.articalId}>
						<h2>{item.articalName}</h2>
						<p>更新时间：{moment(item.updataDate).format("YYYY-MM-DD HH:mm:ss")}</p>
						<div dangerouslySetInnerHTML={{__html:item.articalContent}}></div>
						<a href={`#/blog/${this.state.userId}/${this.state.typeId}/${item.articalId}`}>
							<Icon type="eye-o" />
						({item.reading})</a>
					</div>
				})
			}
			</div>)
		}
		return <section className="">
			<div className="blogBreadcrumb">
				<Breadcrumb>
					<Breadcrumb.Item>
						{this.state.typeName}
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			{blogList}
		</section>
	}
})

export default content;