import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';

class NoteList extends Component {
  render() {
    let items = this.props.userData.noteList.map((note) => {
      return (
        <ListItem
          className='list-item'
          key={note.name}
          primaryText={note.name}
          leftIcon={<EditorInsertDriveFile />}
          rightIcon={<ActionDelete
            className='delete'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.noteNameForDelete = note.name;
              this.isConfirmationOpen = true;
              this.forceUpdate();
            }}
          />}
          onClick={() => browserHistory.push('/' + encodeURIComponent(note.name))} />
      );
    });
    return (
      <div className='note-list'>
        <List>
          {items}

          { this.addNoteMode ?
            <div>
              <TextField
                className='new-note-text'
                floatingLabelText='New Note Name'
                name='newNoteName'
                ref='newNoteName'
                errorText={this.errorText || ''}/>
              <FlatButton
                className='button cancel'
                label='Cancel'
                primary={true}
                onClick={() => {
                  this.addNoteMode = false;
                  this.forceUpdate();
                }} />
              <FlatButton
                className='button add'
                label='Add'
                primary={true}
                onClick={this.handleNewNoteClick.bind(this)} />
            </div>
              
              :

            <ListItem
              primaryText='Add New Note'
              leftIcon={<ActionNoteAdd />}
              onClick={() => {
                this.addNoteMode = true;
                this.forceUpdate();
              }} />
          }
        </List>

        <Dialog
          title={'Do you want to delete ' + this.noteNameForDelete + '?'}
          actions={[
            <FlatButton
              label='No'
              primary={true}
              keyboardFocused={true}
              onClick={() => {
                this.isConfirmationOpen = false;
                this.forceUpdate();
              }}/>,
            <FlatButton
              label='Yes'
              primary={true}
              onClick={this.handleDeleteNoteClick.bind(this)}/>
          ]}
          modal={false}
          open={!!this.isConfirmationOpen}>
        </Dialog>
      </div>
    );
  }
  handleDeleteNoteClick() {
    this.isConfirmationOpen = false;
    let noteList = this.props.userData.noteList.filter((note) => note.name !== this.noteNameForDelete);
    this.props.onSaveUserData(Object.assign({}, this.props.userData, { noteList: noteList }));
  }
  handleNewNoteClick() {
    let newNoteName = this.refs.newNoteName.getValue().trim();
    if(!newNoteName) {
      this.errorText = 'Please enter name';
      this.forceUpdate();
      return;
    }
    let newList = this.props.userData.noteList.slice(0);
    if(newList.filter((note) => note.name === newNoteName).length) {
      this.errorText = 'Note name already exists';
      this.forceUpdate();
      return;
    }
    newList.push({ name: newNoteName });
    this.addNoteMode = false;
    this.props.onSaveUserData(Object.assign({}, this.props.userData, { noteList: newList }));
  }
}

NoteList.propTypes = {
  userData: PropTypes.object.isRequired,
  onSaveUserData: PropTypes.func.isRequired,
};

export default NoteList;
