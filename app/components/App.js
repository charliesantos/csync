import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderContainer from '../containers/HeaderContainer';
import SpinnerContainer from '../containers/SpinnerContainer';
import injectTapEventPlugin from "react-tap-event-plugin";

// Required for clicks
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <HeaderContainer/>
          {this.props.children}
          <SpinnerContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
