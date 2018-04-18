import React from 'react';
import {Motion, spring} from 'react-motion';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const presets = {
  default: { stiffness: 330, damping: 20 },
};

const OzzHeader = ({ active, rest, color, title }) => (
  <Motion
    defaultStyle={{
      y: 40,
    }}
    style={{
      y: spring(active && rest ? 40 : 40, presets.default),
    }}
  >
    {interpolatingStyles =>
      <AppBar
        title={<span>{title}</span>}
        style={{backgroundColor: color}}
        showMenuIconButton={false}
        titleStyle={{textAlign:"center"}}
      />
    }
  </Motion>
);

export default OzzHeader;