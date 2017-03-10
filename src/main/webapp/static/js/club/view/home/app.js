import React from 'react';
import homeService from'../../service/homeService';
import Top from './top';
import Personal_info from './personal_info';
import Skills_level from './skills_level';
import Project_exp from './project_exp'
import Work_exp from './work_exp';
import Competitions from './competitions'
import Library from './library'
import wow from 'wowjs'
import '../../../../style/animate.min.css'

let App=React.createClass({
	getInitialState(){ 
		return {
			top:"",
			personal_info:"",
			skills_level:"",
			project_exp:"",
			work_exp:"",
			competitions:"",
			library:""
		}
	},
	//加载数据放入state
	componentWillMount(){
		let id=this.props.params.userId; 
		debugger
		homeService.getUserInfo(id).then((res)=>{
			this.setState({
				top:res.data.top,
				personal_info:res.data.personal_info,
				skills_level:res.data.skills_level,
				project_exp:res.data.project_exp,
				work_exp:res.data.work_exp,
				competitions:res.data.competitions,
				library:res.data.library
			})
			new wow.WOW().init();
		})
	},
	//挂载完组件后初始化wow.js
	componentDidMount(){
		

	},
	render(){
		return (<div className="view-home">
			<Top data={this.state.top} />
			<Personal_info data={this.state.personal_info} />
			<Skills_level data={this.state.skills_level} />
		    <Project_exp data={this.state.project_exp}/>
		    <Work_exp data={this.state.work_exp}/>
		    <Competitions data={this.state.competitions} />
		    <Library data={this.state.library}/>
		  </div>);
	}
	
})

export default App;