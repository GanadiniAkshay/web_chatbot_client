import React from 'react';
import {Motion, spring} from 'react-motion';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';


const cx = classNames;
const presets = {
    default: { stiffness: 330, damping: 20 }
};

const styles = {
    title: {
      cursor: 'pointer',
    },
};

class DrawButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {open: false};

        this.handleToggle = this.handleToggle.bind(this);
    }

    componentWillUnmount(){
        this.setState({
            stable: false
        });
    }

    handleToggle(){
        this.setState({open: !this.state.open});
    }

    render(){
        const {title, color} = this.props;
        return(
            <div>
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
                    label="Open"
                    labelColor="#ffffff"
                    backgroundColor={color}
                    onClick={this.handleToggle}
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
                <Drawer width={400} openSecondary={true} open={this.state.open} >
                <AppBar
                    title={<span style={styles.title}>{title}</span>}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    onLeftIconButtonClick={this.handleToggle}
                    style={{backgroundColor: color}}
                    titleStyle={{textAlign:"center"}}
                />
                </Drawer>
            </div>
        )
    }
}

export default DrawButton;