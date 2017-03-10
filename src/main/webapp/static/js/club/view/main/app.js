import React from 'react';
let App=React.createClass({
	render:function(){
		  return (<div className="view-home">
   			 <header>user：{this.props.params.userid} ！main page. </header>
 		 </div>);
	}
})

export default App;