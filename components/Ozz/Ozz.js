import React from 'react';
import {Motion, spring} from 'react-motion';
import axios from 'axios';


import $ from 'jquery';

import Button from './Button';
import DrawButton from './DrawButton';
import OzzBase from './OzzBase';


class Ozz extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            active: false,
            hasTriggered: false,
            messages:[],
            backend:this.props.config.backend
        };

        this._handleClick = this._handleClick.bind(this);
        this.sendMessage  = this.sendMessage.bind(this);
    }

    componentDidMount(){
        this.forceUpdate();
        // this.mounted = true;
        // $(document).mouseup($.proxy(function(e){
        //     var container = $('#ozz');

        //     // if the target of the click isn't the container nor a descendant of the container
        //     if (!container.is(e.target) && container.has(e.target).length === 0){
        //         if (this.mounted){
        //             this.setState({active:false});
        //         }
        //     }
        // },this));
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    _handleClick(){
        this.setState({
            active: !this.state.active
        });
    }

    setCookie(cname, cvalue, time) {
        var d = new Date();
        d.setTime(d.getTime() + (time*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    sendMessage(){
        var backend_type = this.state.backend.type;

        if (backend_type == 'dialogflow_v1'){
            this.sendDialogFlowV1Message(this.state.backend.token);
        }else if (backend_type == 'bot_framework'){
            this.startBotFrameworkConversation(this.state.backend.token);
        }
    }

    sendBotFrameworkMessage(conversationID,token,message){
        var axiosConfig = {headers : { 
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json', 
        }}

        var body = {
            "type": "message",
            "from": {
                "id": "user1"
            },
            "text": message
        }

        var that = this;
        axios.post('https://directline.botframework.com/v3/directline/conversations/'+conversationID+'/activities',
                        body,
                        axiosConfig)
                .then(function(response){
                    var id = response.data.id;
                    console.log(id);
                })
                .catch(function(error){
                    console.log(error);
                })
    }

    startBotFrameworkConversation(token){
        var message = document.getElementById("message-bar").value;

        var messages_data = this.state.messages;
    
        var new_user_message = {
            message:message,
            sentByUser:true
        }

        messages_data.push(new_user_message);
        this.setState({messages:messages_data});

        var conversationID = this.getCookie("conversationID");
        
        if (conversationID != ""){
            console.log("From Cookie: " + conversationID);
            this.sendBotFrameworkMessage(conversationID,token,message);
        }
        else{
            var axiosConfig = {headers : { 
                'Cache-Control': 'no-cache',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json', 
            }}
            var body = {}
    
            var that = this;
    
            axios.post('https://directline.botframework.com/v3/directline/conversations',
                        body,
                        axiosConfig)
                .then(function(response){
                    var conversationID = response.data.conversationId;
                    console.log(conversationID);
                    that.setCookie('conversationID',conversationID,1500);
                    this.sendBotFrameworkMessage(conversationID,token,message);
                })
                .catch(function(error){
                    console.log(error);
                })
        }
            
        document.getElementById("message-bar").value = "";
    }

    sendDialogFlowV1Message(token){
        var message = document.getElementById("message-bar").value;
        //var api = this.props.config.api;
        var axiosConfig = {headers : { 
                        'Cache-Control': 'no-cache',
                         'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json', 
                       }}
        var body = { lang: 'en', query:message, sessionId: '12345' }

        var messages_data = this.state.messages;

        var new_user_message = {
            message:message,
            sentByUser:true
        }

        messages_data.push(new_user_message);
        this.setState({messages:messages_data});

        var that = this;

        axios.post('https://api.dialogflow.com/v1/query?v=20150910',
                    body,
                    axiosConfig)
                .then(function(response){
                    var response = response.data.result.fulfillment.speech;
                    var messages_data = that.state.messages;
                    var new_bot_message = {
                        message:response,
                        sentByUser:false
                    }
                    messages_data.push(new_bot_message);
                    that.setState({messages:messages_data});
                    var list = $('#ozz-list');

                    if (list){
                        list.prop('scrollTop',(list.prop('scrollHeight')+1000)); 
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            
        document.getElementById("message-bar").value = "";
        // console.log("sent " + message);
    }


    render(){
        const {active,messages} = this.state;
        const {color, title, style, buttonOpen} = this.props.config;

        // console.log(messages);
        return(
            <div>
                <div className="ozz" id="ozz">
                    {active ? <OzzBase active={active} color={color} title={title} sendMessage={this.sendMessage} messages={messages}/>:null}
                    {style == 0 ? 
                        <Button 
                        active={active}
                        onClick={this._handleClick}
                        color={color}
                        buttonOpen={buttonOpen}
                        />
                        :
                        <DrawButton color={color} title={title} sendMessage={this.sendMessage} buttonOpen={buttonOpen} messages={messages}/>
                    }
                </div>
            </div>
        )
    }
}

export default Ozz;