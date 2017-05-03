import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import {Icon} from 'antd'
import marked from 'marked'
import cNames from 'classnames'

import './editor.less'
//asd
const MdEditor = React.createClass({
  propTypes: {
    content: T.string,
    children: T.node
  }, 
  getInitialState () {
    return {
      panelClass: 'md-panel',
      mode: 'split',
      isFullScreen: false,
      result: marked(this.props.content || '')
    }
  },
  componentDidMount () {
    // cache dom node
    this.textControl = ReactDOM.findDOMNode(this.refs.editor)
    this.previewControl = ReactDOM.findDOMNode(this.refs.preview)
  },
  componentWillUnmount () {
    this.textControl = null
    this.previewControl = null
  },
  render () {
    const panelClass = cNames([ 'md-panel', { 'fullscreen': this.state.isFullScreen } ])
    const editorClass = cNames([ 'md-editor', { 'expand': this.state.mode === 'edit' } ])
    const previewClass = cNames([ 'md-preview', 'markdown', { 'expand': this.state.mode === 'preview', 'shrink': this.state.mode === 'edit' } ])

    return (
      <div className={panelClass}>
        <div className="md-menubar">
          {this._getModeBar()}
          {this._getToolBar()}
        </div>
        <div className={editorClass}>
          <textarea ref="editor" name="content" onChange={this._onChange}></textarea>{/* style={{height: this.state.editorHeight + 'px'}} */}
        </div>
        <div className={previewClass} ref="preview" dangerouslySetInnerHTML={{ __html: this.state.result }}></div>
        <div className="md-spliter"></div>
      </div>
    )
  },
  // public methods
  isDirty () {
    return this._isDirty || false
  },
  getValue () {
    console.log("ctx",this)
    // return this.state.content
    return this.textControl.value
  },
  setValue (value) {
    this.textControl.value=value
    this._onChange();
  },
  // widgets constructors
  _getToolBar () {
    return (
      <ul className="md-toolbar clearfix">
        <li className="tb-btn"><a title="加粗" onClick={this._boldText}>
          <b>B</b>
        </a></li>{/* bold */}
        <li className="tb-btn"><a title="斜体" onClick={this._italicText}>
          <Icon type="info"/>
        </a></li>{/* italic */}
        <li className="tb-btn spliter"></li>
        <li className="tb-btn"><a title="链接" onClick={this._linkText}>
          <Icon type="link"/>
      </a></li>{/* link */}
        <li className="tb-btn"><a title="引用" onClick={this._blockquoteText}>
          <Icon type="code-o" />
        </a></li>{/* blockquote */}
        <li className="tb-btn"><a title="代码段" onClick={this._codeText}>
          <Icon type="file-text" />
        </a></li>{/* code */}
        <li className="tb-btn"><a title="图片" onClick={this._pictureText}>
          <Icon type="picture" />
        </a></li>{/* picture-o */}
        <li className="tb-btn spliter"></li>
        <li className="tb-btn"><a title="有序列表" onClick={this._listOlText}>
          OL
        </a></li>{/* list-ol */}
        <li className="tb-btn"><a title="无序列表" onClick={this._listUlText}>
          UL
        </a></li>{/* list-ul */}
        <li className="tb-btn"><a title="标题" onClick={this._headerText}>
          H
        </a></li>{/* header */}
        {this._getExternalBtn()}
      </ul>
    )
  },
  _getExternalBtn () {
    return React.Children.map(this.props.children, (option) => {
      if (option.type === 'option') {
        return <li className="tb-btn"><a {...option.props}>{option.props.children}</a></li>
      }
    })
  },
  _getModeBar () {
    const checkActive = (mode) => cNames({ active: this.state.mode === mode })

    return (
      <ul className="md-modebar">
        <li className="tb-btn pull-right">
          <a className={checkActive('preview')} onClick={this._changeMode('preview')} title="预览模式">
            <Icon type="eye-o" />
          </a>
        </li> { /* preview mode */ }
        <li className="tb-btn pull-right">
          <a className={checkActive('split')} onClick={this._changeMode('split')} title="分屏模式">
            <Icon type="desktop" />
          </a>
        </li> { /* split mode */ }
        <li className="tb-btn pull-right">
          <a className={checkActive('edit')} onClick={this._changeMode('edit')} title="编辑模式">
            <Icon type="edit" />
          </a>
        </li> { /* edit mode */ }
        <li className="tb-btn spliter pull-right"></li>
        <li className="tb-btn pull-right"><a title="全屏模式" onClick={this._toggleFullScreen}>
          <Icon type="scan" />
        </a></li> {/* full-screen */}
      </ul>
    )
  },
  // event handlers
  _onChange (e) {
    this._isDirty = true // set dirty
    if (this._ltr) clearTimeout(this._ltr)

    this._ltr = setTimeout(() => {
      this.setState({ result: marked(this.textControl.value) }) // change state
    }, 300)
  },
  _changeMode (mode) {
    return (e) => {
      this.setState({ mode })
    }
  },
  _toggleFullScreen (e) {
    this.setState({ isFullScreen: !this.state.isFullScreen })
  },
  // default text processors
  _preInputText (text, preStart, preEnd) {
    const start = this.textControl.selectionStart
    const end = this.textControl.selectionEnd
    const origin = this.textControl.value

    if (start !== end) {
      const exist = origin.slice(start, end)
      text = text.slice(0, preStart) + exist + text.slice(preEnd)
      preEnd = preStart + exist.length
    }
    this.textControl.value = origin.slice(0, start) + text + origin.slice(end)
    // pre-select
    this.textControl.setSelectionRange(start + preStart, start + preEnd)
    this.setState({ result: marked(this.textControl.value) }) // change state
  },
  _boldText () {
    this._preInputText("**加粗文字**", 2, 6)
  },
  _italicText () {
    this._preInputText("_斜体文字_", 1, 5)
  },
  _linkText () {
    this._preInputText("[链接文本](www.yourlink.com)", 1, 5)
  },
  _blockquoteText () {
    this._preInputText("> 引用", 2, 4)
  },
  _codeText () {
    this._preInputText("```\ncode block\n```", 4, 14)
  },
  _pictureText () {
    this._preInputText("![alt](www.yourlink.com)", 2, 5)
  },
  _listUlText () {
    this._preInputText("- 无序列表项0\n- 无序列表项1", 2, 8)
  },
  _listOlText () {
    this._preInputText("1. 有序列表项0\n2. 有序列表项1", 3, 9)
  },
  _headerText () {
    this._preInputText("## 标题", 3, 5)
  }
})

export default MdEditor