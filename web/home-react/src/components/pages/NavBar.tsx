import * as React from 'react';
import Button from '../appearance/Button'
import './NavBar.css'

class NavBar extends React.Component {
  public render() {
    return (<nav><Button>About</Button></nav>);
  }
}

export default NavBar;