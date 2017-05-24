import { connect } from 'react-redux';
import Login from '../components/Login';
import {
  updateUserId,
  updatePassword,
  updateNewPassword,
  updateConfirmNewPassword,
  updateError,
  updateVerificationCode,
  authUser,
} from '../actions/user';

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    password: state.user.password,
    newPassword: state.user.newPassword,
    confirmNewPassword: state.user.confirmNewPassword,
    error: state.user.error,
    verificationCode: state.user.verificationCode,
    requireChangePassword: state.user.requireChangePassword,
    requireVerificationCode: state.user.requireVerificationCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserId: (e) => {
      dispatch(updateUserId(e.target.value));
    },
    onUpdatePassword: (e) => {
      dispatch(updatePassword(e.target.value));
    },
    onUpdateNewPassword: (e) => {
      dispatch(updateNewPassword(e.target.value));
    },
    onUpdateConfirmNewPassword: (e) => {
      dispatch(updateConfirmNewPassword(e.target.value));
    },
    onError: (error) => {
      dispatch(updateError(error));
    },
    onUpdateVerificationCode: (e) => {
      dispatch(updateVerificationCode(e.target.value));
    },
    onLogin: (userId, password, newPassword, verificationCode) => {
      dispatch(authUser(userId, password, newPassword, verificationCode));
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
