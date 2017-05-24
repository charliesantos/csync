import React, { Component, PropTypes } from 'react';

class Spinner extends Component {
  render() {
    let display = this.props.isShowing ? 'block' : 'none';
    return (
      <div style={{ display: display }} className='spinner'>
        <div>{'Wait lang...'}</div>
      </div>
    );
  }
}

Spinner.propTypes = {
  isShowing: PropTypes.bool.isRequired
};

export default Spinner;
