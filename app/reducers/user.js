import {
  UPDATE_LOGGED_IN_STATUS,
  UPDATE_USERID,
  UPDATE_PASSWORD,
  UPDATE_NEW_PASSWORD,
  UPDATE_CONFIRM_NEW_PASSWORD,
  UPDATE_ERROR,
  UPDATE_REQUIRE_CHANGE_PASSWORD,
  UPDATE_VERIFICATION_CODE,
  UPDATE_REQUIRE_VERIFICATION_CODE,
  UPDATE_USER_DATA,
} from '../actions/user';

const initialState = {
  isLoggedIn: false,
  userId: '',
  password: '',
  newPassword: '',
  confirmNewPassword: '',
  error: '',
  requireChangePassword: false,
  requireVerificationCode: false,
  verificationCode: '',
  userData: {
    noteList: [],
    timeSheet: {}
  }
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGGED_IN_STATUS:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn
      });
    case UPDATE_USERID:
      return Object.assign({}, state, {
        userId: action.userId
      });
    case UPDATE_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    case UPDATE_NEW_PASSWORD:
      return Object.assign({}, state, {
        newPassword: action.newPassword
      });
    case UPDATE_CONFIRM_NEW_PASSWORD:
      return Object.assign({}, state, {
        confirmNewPassword: action.confirmNewPassword
      });
    case UPDATE_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });
    case UPDATE_REQUIRE_CHANGE_PASSWORD:
      return Object.assign({}, state, {
        requireChangePassword: action.requireChangePassword
      });
    case UPDATE_VERIFICATION_CODE:
      return Object.assign({}, state, {
        verificationCode: action.verificationCode
      });
    case UPDATE_REQUIRE_VERIFICATION_CODE:
      return Object.assign({}, state, {
        requireVerificationCode: action.requireVerificationCode
      });
    case UPDATE_USER_DATA:
      return Object.assign({}, state, {
        userData: action.userData
      });
    default:
      return state;
  }
};

export default user;
