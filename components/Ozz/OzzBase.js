import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';
import axios from 'axios';

import jQuery from 'jquery';

import OzzHeader from './OzzHeader';
import Login from './Login';
import Main from './Main';

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
        this.logout = this.logout.bind(this);
    }

    logout(){
        var that = this;
        axios.get('/logoutwin')
            .then(function (response) {
                that.setState({"authenticated":false});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        const height = jQuery(window).height();

        this.setState({
            height: height - (height * 0.2),
        });

        var that = this;
        axios.get('/islogged')
            .then(function (response) {
                var data = response.data;
                if (data['logged'] == true){
                    that.setState({authenticated:true,projects:data['projects'],email:data['email']})
                }else{
                    that.setState({authenticated:false})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _handleRest(){
        this.setState({
            stable: true
        });
    }

    render(){
        const { active, config } = this.props;
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
                        width: '1000px',
                        borderRadius: '8px',
                        boxDhadow: '0 5px 40px rgba(0, 0, 0, 0.16)',
                        overflow: 'hidden',
                        display: 'flex',
                        zIndex: '100',
                        flexDirection: 'column'
                    }}
                >
                    <OzzHeader active={active} rest={stable} config={config}/>
                    {this.state.authenticated? <Main logout={this.logout} projects={this.state.projects} email={this.state.email}/>:<Login/>}
                </div>
            }
            </Motion>
        )
    }
}

export default OzzBase;