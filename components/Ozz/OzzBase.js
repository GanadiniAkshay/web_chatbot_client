import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';
import axios from 'axios';

import jQuery from 'jquery';

import OzzHeader from './OzzHeader';
import ChatList  from './ChatList';
import OzzFooter from './OzzFooter';

const presets = {
    default: {stiffness: 330, damping: 20},
};

class OzzBase extends React.Component{
    constructor(props){
        super(props);

        this.state={
            height: 670,
            stable: false,
            authenticated:false,
            currentWindow:1,
            projects:[],
            email:""
        }

        this._handleRest = this._handleRest.bind(this);
    }

    componentDidMount(){
        const height = jQuery(window).height();

        this.setState({
            height: height - (height * 0.2),
        });
    }

    _handleRest(){
        this.setState({
            stable: true
        });
    }

    render(){
        const { active, color, title } = this.props;
        const { stable } = this.state;
        return (
            <Motion
                defaultStyle={{
                    y:20,
                    opacity: 0,
                }}
                style={{
                    y: spring(active? 0:20, presets.default),
                    opacity: spring(active? 1:0, presets.default)
                }}
                onRest={this._handleRest}
            >
            {interpolatingStyles => 
                <div
                    style={{
                        height: this.state.height,
                        opacity: interpolatingStyles.opacity,
                        transform: `translateY(${interpolatingStyles.y}px)`,
                        position: 'fixed',
                        right: '20px',
                        bottom: '120px',
                        background: '#FFF',
                        border: '0.5px solid #58488A',
                        width: '400px',
                        borderRadius: '8px',
                        boxDhadow: '0 5px 40px rgba(0, 0, 0, 0.16)',
                        overflow: 'hidden',
                        display: 'flex',
                        zIndex: '100',
                        flexDirection: 'column'
                    }}
                >
                    <OzzHeader active={active} rest={stable} color={color} title={title}/>
                    <ChatList color={color}/>
                    <OzzFooter convoId={"123"} token={"123"} color={color} sendMessage={this.props.sendMessage}/>
                </div>
            }
            </Motion>
        )
    }
}

export default OzzBase;