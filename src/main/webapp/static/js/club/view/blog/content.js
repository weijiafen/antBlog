import React from 'react';
import { Row , Col , Breadcrumb , Icon , Pagination } from 'antd';
import blogService from '../../service/blogService';
import moment from 'moment';
var content=React.createClass({
	getInitialState:function(){
		return {
			typeName:"",
			list:null,
			typeId:this.props.params.typeId,
			userId:this.props.params.userId,
			pageSize:10,
			pageNum:1,
			total:0
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
	changePage(page){
		var ctx=this;
		this.setState({
			pageNum:page
		},function(){
			ctx.getList(ctx,ctx.state.userId,ctx.state.typeId)
		})
	},
	getList:(ctx,userId,typeId)=>{
		//ctx:需要把作用域传过来设置state
		var menuId=-1;
		blogService.getList({
			userId:userId,
			categoryId:typeId,
			menuId:menuId,
			pageNum:ctx.state.pageNum,
			pageSize:ctx.state.pageSize
		}).then((res)=>{
			if(res.status===0){
				ctx.setState({
					typeName:res.data.categoryName,
					list:res.data.articalList,
					total:res.data.total
				})
			}else{
				ctx.setState({
					typeName:res.data.categoryName,
					list:[],
					total:0
				})
			}
			
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
					return <div className="blogItem clearfix" key={"artical"+item.id}>
						<h2>{item.articalName}</h2>
						<p>更新时间：{moment(item.updataAt).format("YYYY-MM-DD HH:mm:ss")}</p>
						<div dangerouslySetInnerHTML={{__html:item.articalContent}}></div>
						<a href={`#/blog/${this.state.userId}/${this.state.typeId}/${item.id}`}>
							<Icon type="eye-o" />
						({item.reading})</a>
					</div>
				})
			}
			<Pagination  total={this.state.total}  onChange={this.changePage}/>
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