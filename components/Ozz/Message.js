import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Message extends React.Component{
    constructor(props){
        super(props);
        this.message = props.message;
    }
 
    render(){
        const {color} = this.props;

        const borderStyleBot = {
            'borderRadius':'10px',
            'backgroundColor':'#F8F8F8'
        }

        const borderStyleUser = {
            'borderRadius':'10px',
            'backgroundColor':color
        }

        const textUserStyle ={
            'color':'#F8F8FF',
            'whiteSpace':'pre',
            'paddingTop':'2px',
            'paddingBottom':'0px'
        }

        const textBotStyle ={
            'paddingTop':'2px',
            'paddingBottom':'0px'
        }
        return(
            <Card style={this.message.sentByUser? borderStyleUser:borderStyleBot}>
                <CardText style={this.message.sentByUser ? textUserStyle : textBotStyle}>
                    <pre style={{"marginTop":"5px","marginBottom":"5px"}}>{this.message.message}</pre>
                </CardText>
            </Card>
        )
    }
}

export default Message;