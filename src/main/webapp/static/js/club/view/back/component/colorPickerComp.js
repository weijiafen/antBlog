import React from 'react'
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
var ColorPickerComp=React.createClass({
	getInitialState:function(){
		return {
			hexString:this.props.color
		}
	},
	ChangeColor:function(colors){
		this.setState({
			hexString:colors.color
		})
		this.props.callback(colors.color)
	},
	render:function(){
		return (
			<div className="editItem">
				<label>字体颜色：</label>
				<ColorPicker
					color={this.state.hexString}
					onChange={this.ChangeColor}
				/>
				<label>{this.state.hexString}</label>
			</div>
			)
	}
})

export default ColorPickerComp