import React from 'react';
import jQuery from 'jquery';

class Dashboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pins:[],
            fullPins:[]
        }

        this.readMessage = this.readMessage.bind(this);
        this.draw = this.draw.bind(this);
    }

    componentDidMount(){
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          var that = this;
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var resp = jQuery.parseJSON(this.responseText);
                that.setState({pins:resp.pins});
                that.draw()
            }
          });
          
          xhr.open("GET", "/pinned");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "aec98841-2f0b-4f22-8581-83870cee54d1");
          
          xhr.send();
    }

    draw(){
        var pins = this.state.pins;
        for (var i=0;i<pins.length;i++){
            console.log(pins[i]);
            var data = JSON.stringify({
                "message": pins[i],
                "user_name":"akshay"
            });
    
            var xhr = new XMLHttpRequest();
            var that = this;
            xhr.withCredentials = false;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    var resp = jQuery.parseJSON(this.responseText);
                    var current = that.state.fullPins;
                    current.push(resp);
                    that.setState({fullPins:current});
                }
            });
    
            xhr.open("POST", "/api/messages/http");
            xhr.setRequestHeader("Cache-Control", "no-cache");
    
            xhr.send(data);
        }
    }

    readMessage(){
        var recognition = new webkitSpeechRecognition();
        var that = this;
        recognition.onresult = function(event) { 
        var message = event.results[0][0]['transcript'];
            console.log(message);

            if (message.indexOf('dashboard') != -1){
                jQuery('#dashboard').click();
            } else if (message.indexOf('admin') != -1){
                jQuery('#admin').click();
            } else if (message.indexOf('home') != -1){
                jQuery('#home').click();
            }
        }
        recognition.start();
    }


    render(){
        function waitLoad(resp,index){
            document.getElementById("pinboard").innerHTML += "<button message='+"+ resp.message+"'>Remove pin</button><br/><div id='chart_div_"+index+"'></div><br/><div id='results_"+index+"'></div>";
            loadGraph(resp,index);
        }
        function loadGraph(resp,index){
            var results = document.getElementById("results_"+index);
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
    
                var chart = new google.visualization.LineChart(document.getElementById('chart_div_'+index));
                chart.draw(data, options);
                }
        }

        console.log(this.state.fullPins);
        var fullPins = this.state.fullPins;
        
        var pinboard = fullPins.map((current_pin,index)=>{
            waitLoad(current_pin,index);
        });
        
        return (
            <div style={{"height":"100%","width":"100%","overflow":"scroll"}}>
                <p className="btn" id="mic" style={{"marginLeft":"2%","cursor": "pointer"}} onClick={this.readMessage}><i className="fas fa-microphone fa-1x"></i>(ctrl+x)</p>
                <div id="pinboard" style={{"height":"100%","width":"80%","marginLeft":"10%","marginTop":"2%"}}>
                    <h3>Dashboard</h3>
                </div>
            </div>
        )
    }
}

export default Dashboard;