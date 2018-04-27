import React from 'react';
import {Motion, spring} from 'react-motion';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';


import Message from './Message';

import PropTypes from 'prop-types';


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
        var list = $('#ozz-list');

        if (list){
            list.prop('scrollTop',(list.prop('scrollHeight')+1000)); 
        }

        const {color,chat} = this.props;


        const pop_style = {
            height:"81%",
            marginTop:"16%",
            overflow:"scroll"
        }

        const slide_style = {
            height:"84%",
            marginTop:"15%",
            overflow:"scroll"
        }

        const ozz_list__item_bot =  {
            maxWidth:"60%",
            float: "left",
            clear: "both",
            paddingTop:"10px",
            paddingLeft:"10px",
            paddingBottom:"5px",
            whiteSpace:"normal",
            wordWrap:"break-word",
            display:"inline-block" 
        }
          
        const ozz_list__item_user = {
            maxWidth:"60%",
            float: "right",
            clear:"both",
            paddingTop:"10px",
            paddingRight:"10px",
            paddingBottom: "5px",
            whiteSpace:"initial",
            wordWrap:"break-word",
            display:"inline-block"
          }

        var messages_data = this.props.messages;

        var chat_style = (chat == 'pop'? pop_style:slide_style);
        
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
            <div id='ozz-list' style={chat_style}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div className="ozz-list" style={{"overflow":"scroll"}}>
                        {messages}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ChatList;