import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import 'babel-polyfill';
var EditImage extends React.Component {
  onClickSave () {
    // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
    // drawn on another canvas, or added to the DOM.
    const canvas = this.editor.getImage()

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    const canvasScaled = this.editor.getImageScaledToCanvas()
  }

  setEditorRef (editor) {
    if (editor) this.editor = editor
  }

  render () {
    return (
        <AvatarEditor
          ref={this.setEditorRef.bind(this)}
          image="http://example.com/initialimage.jpg"
          width={250}
          height={250}
          border={50}
          scale={1.2}
        />
    )
  }
}

export default EditImage