import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';

import RaisedButton from 'material-ui/RaisedButton';


import FontIcon from 'material-ui/FontIcon';

const cx = classNames;
const presets = {
    default: { stiffness: 330, damping: 20 }
};

class Button extends React.Component {
    constructor(){
        super();

        this.state = {
            stable: false
        }

        this._handleRest = this._handleRest.bind(this);
    }

    componentWillUnmount(){
        this.setState({
            stable: false
        });
    }

    _handleRest(){
        this.setState({
            stable: true
        });
    }

    render(){
        const {active, className, count, onClick, color} = this.props;
        const {stable} = this.state;

        let classes = cx({
            'ozz-button': true,
            'ozz-button--active':active,
        }, className);

        return (
            <Motion
                defaultStyle={{
                    opacity: 0,
                    scale:0
                }}
                style={{
                    opacity: spring(1, presets.default),
                    scale: spring(1, presets.default)
                }}
                onRest={this._handleRest}
            >
            {interpolatingStyles =>
                <RaisedButton 
                    label={active?"Close":"Chatbot"}
                    labelColor="#ffffff"
                    backgroundColor={color}
                    onClick={onClick}
                    style={{
                        opacity: interpolatingStyles.opacity,
                        transform: `scale(${interpolatingStyles.scale})`,
                        position: 'fixed',
                        cursor:'pointer',
                        outline: 0,
                        right: '60px',
                        bottom: '60px',
                        display: 'block',
                        width: '100px',
                        height: '40px',
                        border: 0,
                        borderRadius: '10%',
                        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16)',
                        WebkitTransition: 'box-shadow 200ms ease',
                        transition: 'box-shadow 200ms ease'
                    }}
                    labelStyle={{
                        top:"10px"
                    }}
                />
            }   
            </Motion>
        )
    }
}

export default Button;