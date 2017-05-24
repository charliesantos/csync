import { connect } from 'react-redux';
import Note from '../components/Note';
import { saveUserData } from '../actions/user';

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveUserData: (userData) => {
      dispatch(saveUserData(userData));
    }
  };
};

const NoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);

export default NoteContainer;
