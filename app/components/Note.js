import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';

class Note extends Component {
  render() {
    return (
      <div className='note'>
        <TextField
          name='textEdit'
          ref='textEdit'
          className='text-edit'
          multiLine={true}
          underlineDisabledStyle={{ bottom: '0px' }}
          underlineFocusStyle={{ bottom: '0px' }}
          underlineStyle={{ bottom: '0px' }}/>
        <FlatButton
          className='button back'
          label='Back'
          primary={true}
          onClick={() => browserHistory.push('/notes') } />
        <FlatButton
          className='button save'
          label='Save'
          primary={true}
          onClick={this.handleSaveClick.bind(this)} />
      </div>
    );
  }
  handleSaveClick() {
    let content = this.refs.textEdit.getValue().trim();
    let noteList = this.props.userData.noteList.slice(0);
    for(let a = 0; a < noteList.length; a++) {
      let note = noteList[a];
      if(note.name === this.props.params.name) {
        note.content = content;
        this.props.onSaveUserData(Object.assign({}, this.props.userData, { noteList: noteList }));
        break;
      }
    }
  }
  componentDidUpdate() {
    this.populateText();
  }
  componentDidMount() {
    this.populateText();
  }
  populateText() {
    if(!this.props.userData.noteList.length) {
      return;
    }
    let content = this.props.userData.noteList.filter((note) => note.name === this.props.params.name)[0].content;
    this.refs.textEdit.getInputNode().value = content || '';
  }
}

Note.propTypes = {
  userData: PropTypes.object.isRequired,
  onSaveUserData: PropTypes.func.isRequired,
};

export default Note;
