import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <AppBar
          title={'csync'}
          iconElementLeft={
            <div className='header-bg' onClick={() => browserHistory.push('/dashboard')}></div>
          }
          iconElementRight={
            this.props.isLoggedIn ?
            <div className='user-info'>
              {this.props.userId}
              <span onClick={() => this.props.onLogout()}>{' (logout)'}</span>
            </div> :
            <span></span>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  userId: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
