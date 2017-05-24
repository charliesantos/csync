import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  getLogin() {
    return (
      <div className='initial-login'>
        <div className='field'>
          <TextField
            value={this.props.userId}
            floatingLabelText='User ID'
            name='userId'
            ref='userId'
            onKeyPress={(e) => this.handleKeyPress(e, this.handleLoginClick.bind(this))}
            onChange={this.props.onUpdateUserId}/>
        </div>
        <div className='field'>
          <TextField
            value={this.props.password}
            floatingLabelText='Password'
            name='password'
            ref='password'
            type='password'
            errorText={this.props.error}
            onKeyPress={(e) => this.handleKeyPress(e, this.handleLoginClick.bind(this))}
            onChange={this.props.onUpdatePassword}/>
        </div>
        <div className='field button'>
          <RaisedButton
            onClick={(e) => this.handleLoginClick()}
            label='Login'
            primary={true}/>
        </div>
      </div>
    );
  }
  getChangePassword() {
    return (
      <div className='change-password'>
        <div className='field'>
          <TextField
            value={this.props.newPassword}
            floatingLabelText='New Password'
            name='newPassword'
            ref='newPassword'
            type='password'
            onKeyPress={(e) => this.handleKeyPress(e, this.handleChangePasswordClick.bind(this))}
            onChange={this.props.onUpdateNewPassword}/>
        </div>
        <div className='field'>
          <TextField
            value={this.props.confirmNewPassword}
            floatingLabelText='Confirm New Password'
            name='confirmNewPassword'
            ref='confirmNewPassword'
            type='password'
            errorText={this.props.error}
            onKeyPress={(e) => this.handleKeyPress(e, this.handleChangePasswordClick.bind(this))}
            onChange={this.props.onUpdateConfirmNewPassword}/>
        </div>
        {this.props.requireVerificationCode ?
          <div className='field'>
            <TextField
              value={this.props.verificationCode}
              floatingLabelText='Verification Code'
              name='verificationCode'
              ref='verificationCode'
              onKeyPress={(e) => this.handleKeyPress(e, this.handleChangePasswordClick.bind(this))}
              onChange={this.props.onUpdateVerificationCode}/>
          </div> : ''
        }
        <div className='field button'>
          <RaisedButton
            onClick={(e) => this.handleChangePasswordClick()}
            label='Change Password'
            primary={true}/>
        </div>
      </div>
    )
  }
  render() {
    let screen = this.getLogin();
    if(this.props.requireChangePassword) {
      screen = this.getChangePassword();
    }
    return (
      <div className='login'>
        {screen}
      </div>
    );
  }
  handleLoginClick() {
    let userId = this.props.userId.trim();
    let password = this.props.password.trim();
    if(!this.validatePassword(password)) {
      return this.props.onError('Password should contain at least a number, uppercase, and lowercase letter');
    }
    this.props.onLogin(userId, password);
  }
  handleChangePasswordClick() {
    let newPassword = this.props.newPassword.trim();
    let confirmNewPassword = this.props.confirmNewPassword.trim();
    if(newPassword !== confirmNewPassword) {
      return this.props.onError('Passwords don\'t match');
    }
    if(!this.validatePassword(newPassword)) {
      return this.props.onError('Password should contain at least a number, uppercase, and lowercase letter');
    }
    this.props.onLogin(
      this.props.userId.trim(),
      newPassword,
      confirmNewPassword,
      this.props.verificationCode.trim(),
    );
  }
  handleKeyPress(e, cb) {
    e.key === 'Enter' && cb();
  }
  validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  }
}

Login.propTypes = {
  userId: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  verificationCode: PropTypes.string.isRequired,
  requireChangePassword: PropTypes.bool.isRequired,
  requireVerificationCode: PropTypes.bool.isRequired,
  onUpdateUserId: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired,
  onUpdateNewPassword: PropTypes.func.isRequired,
  onUpdateConfirmNewPassword: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onUpdateVerificationCode: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Login;
