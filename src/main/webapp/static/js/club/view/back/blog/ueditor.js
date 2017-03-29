import React from 'react';
require('../../../library/ueditor/ueditor.config.js')
require('../../../library/ueditor/ueditor.all.min.js')
require('../../../library/ueditor/lang/zh-cn/zh-cn.js')
var UEditor = React.createClass({
            displayName: 'UEditor',
            // 设置默认的属性值
            getDefaultProps: function () {
                return {
                    disabled: false,
                    height: 500,
                    content: '',
                    id: 'editor'
                };
            },
            render: function () {
                return (
                    <div>
                        <script id={this.props.id} name="content" type="text/plain">
                        </script>
                    </div>
                );
            },
    调用初始化方法
            componentDidMount: function () {
                this.initEditor();
            },
    // 编辑器配置项初始化
            initEditor: function () {
                var id = this.props.id;
                var ue = UE.getEditor(id, {
                    // 工具栏，不配置有默认项目
                    toolbars: [[
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                        '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'emotion',
                        'horizontal', '|', 'date', 'time', '|', 'insertimage'
                    ]],
                    lang: 'zh-cn',
                    // 字体
                    'fontfamily': [
                           {label: '', name: 'songti', val: '宋体,SimSun'},
                           {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
                           {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
                           {label: '', name: 'heiti', val: '黑体, SimHei'},
                           {label: '', name: 'lishu', val: '隶书, SimLi'},
                           {label: '', name: 'andaleMono', val: 'andale mono'},
                           {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
                           {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
                           {label: '', name: 'comicSansMs', val: 'comic sans ms'},
                           {label: '', name: 'impact', val: 'impact,chicago'},
                           {label: '', name: 'timesNewRoman', val: 'times new roman'}
                    ],
                    // 字号
                    'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
    // 为编辑器实例添加一个路径，必需项
                    'UEDITOR_HOME_URL': '/react/dist/ueditor/',
                    // 上传图片时后端提供的接口
                    serverUrl: window.api_host + '/innerMessage/uploadImage',
                    enableAutoSave: false,
                    autoHeightEnabled: false,
                    initialFrameHeight: this.props.height,
                    initialFrameWidth: '100%',
    // 是否允许编辑
                    readonly: this.props.disabled
                });
                this.editor = ue;
                var self = this;


                this.editor.ready(function (ueditor) {
                    if (!ueditor) {
// 如果初始化后ueditor不存在删除后重新调用
                        UE.delEditor(self.props.id);
                self.initEditor();
                    }
                });
            },
            // 获取编辑器的内容
            getContent: function () {
                if (this.editor) {
                    return this.editor.getContent();
                }
                return '';
            },
            /**
             * 写入内容｜追加内容
             * @param {Boolean} isAppendTo    [是否是追加]
             * @param {String}  appendContent [内容]
             */
            setContent: function (appendContent, isAppendTo) {
                if (this.editor) {
                    this.editor.setContent(appendContent, isAppendTo);
                }
            },
            // 获取纯文本
            getContentTxt: function () {
                if (this.editor) {
                    return this.editor.getContentTxt();
                }
                return '';
            },
            // 获得带格式的纯文本
            getPlainTxt: function () {
                if (this.editor) {
                    return this.editor.getPlainTxt();
                }
                return '';
            },
            // 判断是否有内容
            hasContent: function () {
                if (this.editor) {
                    return this.editor.hasContents();
                }
                return false;
            },
            // 插入给定的html
            insertHtml: function (content) {
                if (this.editor) {
                    this.editor.execCommand('insertHtml', content);
                }
            },
            // 使编辑器获得焦点
            setFocus: function () {
                if (this.editor) {
                    this.editor.focus();
                }
            },
            // 设置高度
            setHeight: function (height) {
                if (this.editor) {
                    this.editor.setHeight(height);
                }
            }
        });


        module.exports = UEditor;