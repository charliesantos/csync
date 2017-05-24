import { connect } from 'react-redux';
import Header from '../components/Header';
import { logoutUser } from '../actions/user';

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logoutUser());
    }
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
