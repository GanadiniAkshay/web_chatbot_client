import React from 'react';
import axios from 'axios';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import jQuery from 'jquery';
import {indigo900,grey800,grey400} from 'material-ui/styles/colors';

const styles = {
    
    underlineFocusStyle: {
      borderColor: indigo900,
    },
    underlineStyle:{
        borderColor: grey400,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelFocusStyle: {
      color: indigo900,
    },
  };

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={};

        this.update = this.update.bind(this);
    }

    update(){
        window.location.assign("/login")
    }

    render(){
        return(
            <Paper style={{"textAlign":"center","marginTop":"12%","marginLeft":"20%","width":"60%"}} elevation={4}>
                    <br/>
                    <RaisedButton label="Login with Google" labelColor="#FFFFFF" backgroundColor="#58488A" onClick={this.update}/>
                    <br/><br/>
            </Paper>
        )
    }
}

export default Login;