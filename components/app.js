import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Ozz from './Ozz/Ozz';

const config = {
    'color':'#58488A'
}

const App = () => (
    <MuiThemeProvider>
        <Ozz config={config}/>
    </MuiThemeProvider>
  );

render(<App/>,document.getElementById('webchat_client'));