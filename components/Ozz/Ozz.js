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
            messages:[]
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

    sendMessage(){
        var message = document.getElementById("message-bar").value;
        //var api = this.props.config.api;
        var axiosConfig = {headers : { 
                        'Cache-Control': 'no-cache',
                         'Authorization': 'Bearer 70cbdadb7d184803a88c6f8f56ea5196',
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