import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Ozz from './Ozz/Ozz';

window.webchat= function(color, title){
    render(
        <MuiThemeProvider>
            <Ozz color={color} title={title}/>
        </MuiThemeProvider>
        ,document.getElementById('webchat_client'));
}
