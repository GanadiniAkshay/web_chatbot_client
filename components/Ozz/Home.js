import React from 'react';
import jQuery from 'jquery';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {indigo900,grey800,grey400} from 'material-ui/styles/colors';

const styles = {
    customWidth: {
        width: 200,
    },
    underlineFocusStyle: {
      borderColor: indigo900,
    },
    underlineStyle:{
        borderColor: grey400,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelFocusStyle: {
      color: indigo900,
    },
};

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            isLoaded:false,
            message:"",
            intent:"",
            entities:{},
            project:""
        }

        this.getResults  = this.getResults.bind(this);
        this.readMessage = this.readMessage.bind(this);
        this.pinResult = this.pinResult.bind(this);
        this.addError = this.addError.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        jQuery(document).keypress("x",function(e) {
            if(e.ctrlKey)
              jQuery('#mic').click();
          });
        this.setState({"project":this.props.projects[0]});
    }

    handleChange(){
        var proj = document.getElementById("project").value;
        this.setState({"project":proj});
    }

    queryChange(){
        var query = document.getElementById("query").value;
        this.setState({"query":query});
    }

    pinResult(){
          var data = JSON.stringify({
            "query": this.state.message
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
            }
          });
          
          xhr.open("POST", "http://localhost:8080/pinned");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "b7feaa3f-047c-4426-b64c-cf00a7f20f10");
          
          xhr.send(data);
    }

    addError(){
          var data = JSON.stringify({
            "query": this.state.message,
            "intent":this.state.intent,
            "entities":this.state.entities
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
            }
          });
          
          xhr.open("POST", "http://localhost:8080/failures");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "b7feaa3f-047c-4426-b64c-cf00a7f20f10");
          
          xhr.send(data);
    }

    readMessage(){
        var recognition = new webkitSpeechRecognition();
        var that = this;
        recognition.onresult = function(event) { 
        var message = event.results[0][0]['transcript'];
            console.log(message);

            if (message.indexOf('dashboard') != -1){
                jQuery('#query').val('/dashboard');
            } else if (message.indexOf('admin') != -1){
                jQuery('#query').val('/admin');
            } else if (message.indexOf('home') != -1){
                jQuery('#query').val('/home');
            } else{
                that.setState({"query":message});
            }
            jQuery('#submit').click();
        }
        recognition.start();
    }

    getResults(){
        this.setState({isLoading:true,isLoaded:false});
        function loadText(text){
            var results = document.getElementById("results");
            var html = "<p>" + text + "</p>";
            results.innerHTML = html;
        }

        function loadGraph(resp){
            var results = document.getElementById("results");
            var items = resp.response;
            var graph_config = resp.graph;
            
            var data_list = [];

            var html = "<table className='table'>"
            for (var i=0;i<items.length;i++){
                var headers = Object.keys(items[0]);
                if (i == 0){
                    html += "<thead><tr>";
                    for (var j=0;j<headers.length;j++){
                        html += "<th scope='col'>" + headers[j] + "</th>"
                    }
                    html += "</tr></thead><tbody>";
                }
                html+="<tr>"
                var elements = Object.values(items[i]);
                var gh_elements = items[i]
    
                var axes = []
    
                if (graph_config['x']['type'] == 'date'){
                    axes.push(new Date(gh_elements[graph_config['x']['value']]))
                }else{
                    axes.push(gh_elements[graph_config['x']['value']])
                }
    
                if (graph_config['y']['type'] == 'date'){
                    axes.push(new Date(gh_elements[graph_config['y']['value']]))
                }else{
                    axes.push(gh_elements[graph_config['y']['value']])
                }
    
                data_list.push(axes)
                for (var j=0;j<elements.length;j++){
                    html += "<td>" + elements[j] + "</td>"
                }
                html+="</tr>"
            }
            html+="</tbody></table><br/>"
            results.innerHTML = html;
    
            google.charts.load('current', {packages: ['corechart', 'line']});
            google.charts.setOnLoadCallback(drawBackgroundColor);
    
            function drawBackgroundColor() {
                var data = new google.visualization.DataTable();
                data.addColumn(graph_config['x']['type'],graph_config['x']['value']);
                data.addColumn(graph_config['y']['type'],graph_config['y']['value']);
    
                data.addRows(data_list);
    
                var options = {
                    hAxis: {
                    title: graph_config['x']['name']
                    },
                    vAxis: {
                    title: graph_config['y']['name']
                    },
                    backgroundColor: '#f1f8e9'
                };
    
                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                chart.draw(data, options);
                }
        }
        var results = document.getElementById("results");
        results.innerHTML = "";

        var chart_div = document.getElementById("chart_div");
        chart_div.innerHTML = "";

        var query = document.getElementById("query").value;

        if (query == '/dashboard'){
            this.props.showDashboard();
        }else if (query == '/admin'){
            this.props.showAdmin();
        }else if (query == '/home'){
            this.props.showHome();
        }else{
            var data = JSON.stringify({
                "message": query,
                "user_name":this.props.email + "!-!" + this.state.project
            });
    
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            var that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    try{
                        var resp = jQuery.parseJSON(this.responseText);
                        console.log(resp);
                        that.setState({isLoading:false,isLoaded:true,message:resp.message,intent:resp.intent,entities:resp.entities});
                        if (resp.type == 'text'){
                            loadText(resp.response);
                        }
                        else{
                            loadGraph(resp);
                        }
                    } catch (error){
                        if (!resp){
                            console.log(error);
                            loadText(this.responseText);
                        }
                    }
                
                }
            });
    
            xhr.open("POST", "/api/messages/http");
            xhr.setRequestHeader("Cache-Control", "no-cache");
    
            xhr.send(data);
        }
    }

    render(){
        var loader = (
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loading"/>
            </div>
        )

        var buttons = (
            <div>
                <button style={{"marginLeft":"10%","backgroundColor":"#58488A","color":"white","cursor":"pointer"}} onClick={this.pinResult}>Pin Result</button>
                <button style={{"marginLeft":"10%","backgroundColor":"#58488A","color":"white","cursor":"pointer"}} onClick={this.addError}>Incorrect</button>
            </div>
        )

        var projs = this.props.projects.map((proj,index)=>{
            return (
                <option value={proj} key={index}>{proj}</option>
            )
        })

        return (
            <div style={{"height":"100%","width":"100%","overflow":"scroll","marginTop":"2%"}}>
                <div style={{"width":"30%","marginLeft":"60%"}}>
                <select onChange={this.handleChange} id="project">
                    {projs}
                </select>
                </div>
                <div style={{"width":"70%","marginLeft":"10%"}}>
                    <TextField
                        hintText="what is the air quality in new york"
                        id="query"
                        floatingLabelText="Query"
                        autoComplete="off"
                        floatingLabelFixed={true}
                        fullWidth={true}
                        value={this.state.query}
                        onChange={this.queryChange}
                        underlineFocusStyle={styles.underlineFocusStyle}
                        underlineStyle={styles.underlineStyle}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <RaisedButton id="submit" label="Submit" labelColor="#FFFFFF" backgroundColor="#58488A" onClick={this.getResults}/>
                    <p className="btn" id="mic" style={{"marginLeft":"2%","cursor": "pointer","display":"inline"}} onClick={this.readMessage}><i className="fas fa-microphone fa-1x"></i>(ctrl+x)</p>
                </div>
                <br/>
                <div style={{"height":"100%","width":"80%","marginLeft":"10%","marginTop":"2%"}}>
                    {this.state.isLoading?loader:null}
                    {this.state.isLoaded?buttons:null}
                    <br/>
                    <div id="chart_div"></div>
                    <br/>
                    <div id="results"></div>
                </div>
            </div>
        )
    }
}

export default Home;