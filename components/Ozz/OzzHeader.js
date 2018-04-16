import React from 'react';
import {Motion, spring} from 'react-motion';

import RaisedButton from 'material-ui/RaisedButton';

const presets = {
  default: { stiffness: 330, damping: 20 },
};

const OzzHeader = ({ active, rest, config }) => (
  <Motion
    defaultStyle={{
      y: 40,
    }}
    style={{
      y: spring(active && rest ? 40 : 40, presets.default),
    }}
  >
    {interpolatingStyles =>
      <header
        className="ozz-header"
        style={{
          height: interpolatingStyles.y,
          transform: `translate(${interpolatingStyles.height}px)`,
          textAlign: 'center',
          color:'white',
          background:config.color
        }}
      >
      <br/>
      <span style={{"marginBottom":"30%"}}>Roverside Analytics Bot</span>
      </header>
    }
  </Motion>
);

export default OzzHeader;