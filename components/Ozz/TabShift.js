import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import Home from './Home';
import Dashboard from './Dashboard';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class TabShift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          inkBarStyle={{backgroundColor:"#000000"}}
          tabItemContainerStyle={{backgroundColor:"#58488A"}}
        >
          <Tab label="Query" value={0}>
            <div style={{"width":"2%","marginLeft":"90%","marginTop":"2%"}}>
              <RaisedButton label="Logout" labelColor="#FFFFFF" backgroundColor="#58488A" onClick={this.props.logout}/>
            </div>
          </Tab>
          <Tab label="Dashboard" value={1}>
            <div style={{"width":"2%","marginLeft":"90%","marginTop":"2%"}}>
              <RaisedButton label="Logout" labelColor="#FFFFFF" backgroundColor="#58488A" onClick={this.props.logout}/>
            </div>
          </Tab>
          <Tab label="Admin" value={2}>
            <div style={{"width":"2%","marginLeft":"90%","marginTop":"2%"}}>
              <RaisedButton label="Logout" labelColor="#FFFFFF" backgroundColor="#58488A" onClick={this.props.logout}/>
            </div>
          </Tab>
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <Home projects={this.props.projects} email={this.props.email}/>
          </div>
          <div style={styles.slide}>
            <h3>Dashboard</h3>
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default TabShift;