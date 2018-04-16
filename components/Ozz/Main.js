import React from 'react';
import axios from 'axios';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import TabShift from './TabShift';

import jQuery from 'jquery';

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div>
                    <TabShift projects={this.props.projects} email={this.props.email} logout={this.props.logout}/>
                </div>
            </div>
        )
    }
}

export default Main;