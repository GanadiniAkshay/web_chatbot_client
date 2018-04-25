import React from 'react';
import {Motion, spring} from 'react-motion';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';


import Message from './Message';

import PropTypes from 'prop-types';


const ozz_list__item_bot =  {
    maxWidth:"60%",
    float: "left",
    clear: "both",
    paddingTop:"10px",
    paddingLeft:"10px",
    paddingBottom:"5px"
  }
  
const ozz_list__item_user = {
    maxWidth:"60%",
    float: "right",
    clear:"both",
    paddingTop:"10px",
    paddingRight:"10px",
    paddingBottom: "5px"
  }

class ChatList extends React.Component{
    constructor(){
        super();
        this.state = {
            messages:[
                {
                    message:"hola",
                    sentByUser:false
                },
                {
                    message:'hi',
                    sentByUser:true
                }
            ]
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(state){
        this.setState(state);
    }

    shouldComponentUpdate(){
        return true;
    }

    render(){
        const {color} = this.props;

        console.log(this.props);

        var messages_data = this.props.messages;
        
        let messages = messages_data.map((message,i)=>{
            return(
                <div 
                    style={(message.sentByUser? ozz_list__item_user:ozz_list__item_bot)}
                    key={`list-item-${i}`}
                >
                    <Message message={message} color={color}/>
                </div>
            )
        });
        

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className="ozz-list" style={{"overflow":"scroll"}}>
                    {messages}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default ChatList;