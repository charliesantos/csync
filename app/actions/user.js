
import { decode } from 'jsonwebtoken';
import { toggleSpinner } from './spinner';
import config from '../config';
import { browserHistory } from 'react-router';

let _userAttributes = null;
let _cognitoUser = null;
let _userInit = false;

export const UPDATE_USERID = 'UPDATE_USERID';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_NEW_PASSWORD = 'UPDATE_NEW_PASSWORD';
export const UPDATE_CONFIRM_NEW_PASSWORD = 'UPDATE_CONFIRM_NEW_PASSWORD';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_REQUIRE_CHANGE_PASSWORD = 'UPDATE_REQUIRE_CHANGE_PASSWORD';
export const UPDATE_REQUIRE_VERIFICATION_CODE = 'UPDATE_REQUIRE_VERIFICATION_CODE';
export const UPDATE_VERIFICATION_CODE = 'UPDATE_VERIFICATION_CODE';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_LOGGED_IN_STATUS = 'UPDATE_LOGGED_IN_STATUS';

export const updateLoggedInStatus = (isLoggedIn) => {
  return {
    type: UPDATE_LOGGED_IN_STATUS,
    isLoggedIn: isLoggedIn
  };
};

export const updateUserId = (userId) => {
  return {
    type: UPDATE_USERID,
    userId: userId
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    password: password
  };
};

export const updateNewPassword = (newPassword) => {
  return {
    type: UPDATE_NEW_PASSWORD,
    newPassword: newPassword
  };
};

export const updateConfirmNewPassword = (confirmNewPassword) => {
  return {
    type: UPDATE_CONFIRM_NEW_PASSWORD,
    confirmNewPassword: confirmNewPassword
  };
};

export const updateError = (error) => {
  return {
    type: UPDATE_ERROR,
    error: error
  };
};

export const updateRequireChangePassword = (requireChangePassword) => {
  return {
    type: UPDATE_REQUIRE_CHANGE_PASSWORD,
    requireChangePassword: requireChangePassword
  };
};

export const updateRequireVerificationCode = (requireVerificationCode) => {
  return {
    type: UPDATE_REQUIRE_VERIFICATION_CODE,
    requireVerificationCode: requireVerificationCode
  };
};

export const updateVerificationCode = (verificationCode) => {
  return {
    type: UPDATE_VERIFICATION_CODE,
    verificationCode: verificationCode
  };
};

export const updateUserData = (userData) => {
  return {
    type: UPDATE_USER_DATA,
    userData: userData
  };
};

export const saveUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const deleteUserId = () => {
  return localStorage.removeItem('userId');
};

export const fetchUserData = (callback) => {
  return (dispatch) => {
    let s3 = new AWS.S3();
    s3.getObject({
      Bucket: config.bucket,
      Key: getUserId() + '.json',
    }, (err, data) => {
      if(err && err.code !== 'NoSuchKey') {
        return callback(err);
      }
      if(err && err.code === 'NoSuchKey') {
        return callback();
      }
      try {
        callback(null, JSON.parse(data.Body.toString()));
      } catch(e) {
        callback(e);
      }
    });
  };
};

export const saveUserData = (userData) => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    let s3 = new AWS.S3();
    s3.putObject({
      Bucket: config.bucket,
      Key: getUserId() + '.json',
      Body: JSON.stringify(userData),
    }, (err, data) => {
      if(err) {
        console.log(err);
        return dispatch(toggleSpinner(false));
      }
      dispatch(updateUserData(userData));
      dispatch(toggleSpinner(false));
    });
  };
};

export const initUser = (callback) => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    if(_userInit) {
      dispatch(toggleSpinner(false));
      return callback();
    }
    let userId = getUserId();
    if(!userId) {
      dispatch(updateLoggedInStatus(false));
      dispatch(toggleSpinner(false));
      return callback('userId missing');
    }
    let poolData = { UserPoolId: config.userPoolId, ClientId: config.clientId };
    let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    let userData = { Username: userId, Pool: userPool };
    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.getSession((err, result) => {
      if(err) {
        dispatch(updateLoggedInStatus(false));
        dispatch(toggleSpinner(false));
        return callback(err);
      }
      AWS.config.update({
        region: config.region,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.identityPoolId,
          Logins: {
            ['cognito-idp.us-west-2.amazonaws.com/' + config.userPoolId]: result.getIdToken().getJwtToken()
          }
        })
      });
      dispatch(fetchUserData((err, data) => {
        if(err) {
          return dispatch(logoutUser());
        }
        _userInit = true;
        dispatch(updateLoggedInStatus(true));
        dispatch(updateUserId(userId));
        data && dispatch(updateUserData(data));
        dispatch(toggleSpinner(false));
        callback();
      }));
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    deleteUserId();
    dispatch(updateUserId(''));
    _cognitoUser && _cognitoUser.signOut();
    location.reload(true);
  };
};

export const authUser = (userId, password, newPassword, verificationCode) => {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    let authenticatorParams = {};
    let credentials = { Username: userId, Password: password };
    let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(credentials);
    let poolData = { UserPoolId: config.userPoolId, ClientId: config.clientId };
    let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    let userData = { Username: credentials.Username, Pool: userPool };

    // Initialize if not initialize yet
    // Re-initialize if this is not a password reset flow
    if(!_cognitoUser || !newPassword) {
      _cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    }
    authenticatorParams = {
      onFailure: (err) => {
        if(err.code !== 'PasswordResetRequiredException') {
          dispatch(toggleSpinner(false));
          return dispatch(updateError(err.message));
        }
        _cognitoUser.forgotPassword(authenticatorParams);
      },
      onSuccess: (result) => {
        // This is coming from password reset with verification code
        if(verificationCode) {
          dispatch(toggleSpinner(false));
          return dispatch(authUser(userId, password));
        }
        dispatch(toggleSpinner(false));
        saveUserId(decode(result.idToken.jwtToken)['cognito:username']);
        dispatch(initUser(() => browserHistory.push('/dashboard')));
      },
      newPasswordRequired: (userAttributes) => {
        _userAttributes = userAttributes;
        dispatch(toggleSpinner(false));
        dispatch(updateError(''));
        dispatch(updateRequireChangePassword(true));
      },
      inputVerificationCode: () => {
        dispatch(toggleSpinner(false));
        dispatch(updateError(''));
        dispatch(updateRequireChangePassword(true));
        dispatch(updateRequireVerificationCode(true));
      }
    };
    if(verificationCode) {
      _cognitoUser.confirmPassword(verificationCode, newPassword, authenticatorParams);
    } else if(newPassword) {
      delete _userAttributes.email_verified;
      _cognitoUser.completeNewPasswordChallenge(newPassword, _userAttributes, authenticatorParams);
    } else {
      _cognitoUser.authenticateUser(authenticationDetails, authenticatorParams);
    }
  };
};
