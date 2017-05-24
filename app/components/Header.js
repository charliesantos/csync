import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
              <span onClick={() => {
                this.isConfirmationOpen = true;
                this.forceUpdate();
              }}>{' (logout)'}</span>
            </div> :
            <span></span>
          }
        />
        <Dialog
          title={'Are you sure you want to logout?'}
          actions={[
            <FlatButton
              label='No'
              primary={true}
              keyboardFocused={true}
              onClick={() => {
                this.isConfirmationOpen = false;
                this.forceUpdate();
              }}/>,
            <FlatButton
              label='Yes'
              primary={true}
              onClick={() => this.props.onLogout()}/>
          ]}
          modal={false}
          open={!!this.isConfirmationOpen}>
        </Dialog>
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
