import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

const mapStateToProps = (state) => {
  return {
    isShowing: state.spinner.isShowing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

const SpinnerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner);

export default SpinnerContainer;
