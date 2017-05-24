import { connect } from 'react-redux';
import NoteList from '../components/NoteList';
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

const NoteListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);

export default NoteListContainer;
