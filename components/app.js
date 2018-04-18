import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Ozz from './Ozz/Ozz';

window.webchat= function(config){
    render(
        <MuiThemeProvider>
            <Ozz config={config}/>
        </MuiThemeProvider>
        ,document.getElementById('webchat_client'));
}
