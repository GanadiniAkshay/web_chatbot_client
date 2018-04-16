import React from 'react';
import {Motion, spring} from 'react-motion';

import RaisedButton from 'material-ui/RaisedButton';

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
      <header
        className="ozz-header"
        style={{
          height: interpolatingStyles.y,
          transform: `translate(${interpolatingStyles.height}px)`,
          textAlign: 'center',
          color:'white',
          background:color
        }}
      >
      <br/>
      <span style={{"marginBottom":"30%"}}>{title}</span>
      </header>
    }
  </Motion>
);

export default OzzHeader;