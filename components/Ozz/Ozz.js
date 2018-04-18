import React from 'react';
import {Motion, spring} from 'react-motion';

import $ from 'jquery';

import Button from './Button';
import DrawButton from './DrawButton';
import OzzBase from './OzzBase';

class Ozz extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            active: false,
            hasTriggered: false
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
        document.getElementById("message-bar").value = "";
        console.log("sent " + message);
    }


    render(){
        const {active} = this.state;
        const {color, title, style, buttonOpen} = this.props.config;
        return(
            <div>
                <div className="ozz" id="ozz">
                    {active ? <OzzBase active={active} color={color} title={title} sendMessage={this.sendMessage}/>:null}
                    {style == 0 ? 
                        <Button 
                        active={active}
                        onClick={this._handleClick}
                        color={color}
                        buttonOpen={buttonOpen}
                        />
                        :
                        <DrawButton color={color} title={title} sendMessage={this.sendMessage} buttonOpen={buttonOpen}/>
                    }
                </div>
            </div>
        )
    }
}

export default Ozz;