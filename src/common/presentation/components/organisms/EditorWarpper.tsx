import React from "react";
import Editor from "@toast-ui/editor";

class EditorWrapper extends React.Component<any, any> {
  rootEl: any = React.createRef();

  editorInst: any = null;

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.editorInst;
  }

  bindEventHandlers(props: any) {
    Object.keys(this.props)
      .filter(key => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach(key => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.editorInst.off(eventName);
        this.editorInst.on(eventName, props[key]);
      });
  }

  componentDidMount() {
    this.editorInst = new Editor({
      el: this.rootEl.current,
      ...this.props
    });

    this.bindEventHandlers(this.props);
  }

  shouldComponentUpdate(nextProps: any) {
    const instance = this.getInstance();
    const { height, previewStyle } = nextProps;

    if (this.props.height !== height) {
      instance.height(height);
    }

    if (this.props.previewStyle !== previewStyle) {
      instance.changePreviewStyle(previewStyle);
    }

    // @ts-ignore
    this.bindEventHandlers(nextProps, this.props);

    return false;
  }

  render() {
    // @ts-ignore
    return <div ref={this.rootEl} />;
  }
}

export default EditorWrapper;