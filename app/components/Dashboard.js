import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import DeviceAccessTime from 'material-ui/svg-icons/device/access-time';
import { browserHistory } from 'react-router';
import config from '../config';

class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard'>
        <List>
          <ListItem
            primaryText='Notes'
            leftIcon={<EditorInsertDriveFile />}
            onClick={() => browserHistory.push('/notes')} />
          <ListItem
            primaryText='Time Sheet'
            leftIcon={<DeviceAccessTime />} />
        </List>
      </div>
    );
  }
}

export default Dashboard;
