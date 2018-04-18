import React from 'react';
import {Motion, spring} from 'react-motion';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Send from 'material-ui/svg-icons/content/send';
import {fullWhite} from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';

const footer_style = {
    clear: "top",
    display: "block",
    bottom: 0,
    position: "absolute",
    height: "auto",
    minHeight: "8%",
    overflow: "hidden",
    zIndex: 1,
    width: "100%",
    paddingRight: "2%",
    paddingLeft:0,
    paddingTop: 0,
    paddingBottom: 0,
    background: "rgb(232, 232, 232)"
}

const message_style = {
    float: "left",
    marginLeft:"5%",
    width:"80%" 
}

class OzzFooter extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            message:"",
            convoId:props.convoId,
            token:props.token};
    }

    onChange(state){
        this.setState(state);
    }

    _handleTextFieldChange(e){
        this.setState({
            message:e.target.value
        });
    }

    _handleEnter(e){
        if (!e.shiftKey && (e.which == 13 || e.which == 10)){
            e.preventDefault();
            this.send();
        }
    }

    send(){
        this.props.sendMessage();
    }

    componentDidMount(){
        this.refs.messager.focus();
    }

    render(){
        const style = {
            borderColor:this.props.color
        }

        setTimeout(function(){
            var list = $('.ozz-list');
            list.prop('scrollTop',(list.prop('scrollHeight'))); 
        },100);

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
               <footer className="ozz-footer" style={footer_style}>
                   <div className="message-bar" style={message_style}>
                       <TextField id="message-bar"
                                  ref='messager'
                                  multiLine={true} 
                                  hintText={'Send a message...'}
                                  underlineFocusStyle={style}
                                  underlineStyle={{borderColor:"black"}}
                                  fullWidth
                                  onKeyPress={this._handleEnter.bind(this)}/>
                   </div>
                   <div className="send">
                        <IconButton onClick={this.send.bind(this)}><ContentSend/></IconButton>
                   </div>
                </footer>
            </MuiThemeProvider>
        )
    }
};

OzzFooter.propTypes = {
    'sendMessage':PropTypes.func.isRequired
}

export default OzzFooter;