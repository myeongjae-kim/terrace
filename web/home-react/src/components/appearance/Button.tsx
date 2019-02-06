import * as React from 'react';
import './Button.css'

class Button extends React.Component {
  public render() {
    return (<button className="mat-button">{this.props.children}</button>);
  }
}

export default Button;