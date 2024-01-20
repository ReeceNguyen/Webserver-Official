//Ctrinh đổi trạm
function doalert(e) {
    if (e.checked) {
      alert("station 2");
      fn_ScreenHidden('dia-weight1','dia-weight2','dia-weight3','dia-weight1_s2','dia-weight2_s2','dia-weight3_s2')
      fn_ScreenChange1('pag_2','pag');
    } else {
      alert("station 1");
      fn_ScreenHidden('dia-weight1','dia-weight2','dia-weight3','dia-weight1_s2','dia-weight2_s2','dia-weight3_s2')
      fn_ScreenChange1('pag','pag_2');
    }
}
// Trạm 1
var data_w1 = 0;
var data_w2 = 0;
var data_w3 = 0;
var data_w1_s2 = 0;
var data_w2_s2 = 0;
var data_w3_s2 = 0;
socket.on("Act_Weight_1",function(data){
    data_w1 = data;
});
socket.on("Act_Weight_2",function(data){
    data_w2 = data;
});
socket.on("Act_Weight_3",function(data){
    data_w3 = data;
});
socket.on("Act_Weight_1_s2",function(data){
    data_w1_s2 = data;
});
socket.on("Act_Weight_2_s2",function(data){
    data_w2_s2 = data;
});
socket.on("Act_Weight_3_s2",function(data){
    data_w3_s2 = data;
});
var trace1 = {
    y:[data_w1],
    mode: 'lines',
    name: 'Weight 1',
    line: {color: '#ff0000'},
}
var trace2 ={
    y:[data_w2],
    mode: 'lines',
    name: 'Weight2',
    line: { color: '#0000ff' },
}
var trace3 = {
    y:[data_w3],
    mode: 'lines',
    name: 'Weight3',
    line: { color: '#00ff00' },
}
var layout ={
    title: 'Station 1: Weight and Time',
    xaxis:{
      title:'Time',
    },
    yasix:{
      title:'Weight',
    },
    font:{
        family: 'Montserrat',
        size: 12,
        weight:'bold',
    },
    showlegend: true,
}
var trace1_s2 = {
    y:[data_w1_s2],
    mode: 'lines',
    name: 'Weight 1',
    line: {color: '#ff0000'},
}
var trace2_s2 ={
    y:[data_w2_s2],
    mode: 'lines',
    name: 'Weight2',
    line: { color: '#0000ff' },
}
var trace3_s2 = {
    y:[data_w3_s2],
    mode: 'lines',
    name: 'Weight3',
    line: { color: '#00ff00' },
}
var layout_s2 ={
    title: 'Station 2: Weight and Time',
    xaxis:{
      title:'Time',
    },
    yasix:{
      title:'Weight',
    },
    font:{
        family: 'Montserrat',
        size: 12,
        weight:'bold',
    },
    showlegend: true,
}
Plotly.newPlot('dia-weight1',[trace1],layout,{responsive:true,displayModeBar: false, staticPlot: true});
    var cnt = 0;
setInterval(function(){
    Plotly.extendTraces('dia-weight1',{ y:[[data_w1]]}, [0]);
    cnt++;
    if(cnt > 300) {
        Plotly.relayout('dia-weight1',{
            xaxis: {
                range: [cnt-300,cnt]
            }
        });
    }
},1000);


Plotly.newPlot('dia-weight2',[trace2],layout,{responsive:true,displayModeBar: false, staticPlot: true});
setInterval(function(){
    Plotly.extendTraces('dia-weight2',{ y:[[data_w2]]}, [0]);
    cnt++;
    if(cnt > 300) {
        Plotly.relayout('dia-weight2',{
            xaxis: {
                range: [cnt-300,cnt]
            }
        });
    }
},1000);


Plotly.newPlot('dia-weight3',[trace3],layout,{responsive:true,displayModeBar: false, staticPlot: true});
setInterval(function(){
    Plotly.extendTraces('dia-weight3',{ y:[[data_w3]]}, [0]);
    cnt++;
    if(cnt > 300) {
        Plotly.relayout('dia-weight3',{
            xaxis: {
                range: [cnt-300,cnt]
            }
        });
    }
},1000);

Plotly.newPlot('dia-weight1_s2',[trace1_s2],layout_s2,{responsive:true,displayModeBar: false, staticPlot: true});
setInterval(function(){
    Plotly.extendTraces('dia-weight1_s2',{ y:[[data_w1_s2]]}, [0]);
    cnt++;
    if(cnt > 300) {
        Plotly.relayout('dia-weight1_s2',{
            xaxis: {
                range: [cnt-300,cnt]
            }
        });
    }
},1000);


Plotly.newPlot('dia-weight2_s2',[trace2_s2],layout_s2,{responsive:true,displayModeBar: false, staticPlot: true});
setInterval(function(){
    Plotly.extendTraces('dia-weight2_s2',{ y:[[data_w2_s2]]}, [0]);
    cnt++;
    if(cnt > 300) {
        Plotly.relayout('dia-weight2_s2',{
            xaxis: {
                range: [cnt-300,cnt]
            }
        });
    }
},1000);


Plotly.newPlot('dia-weight3_s2',[trace3_s2],layout_s2,{responsive:true,displayModeBar: false, staticPlot: true});
setInterval(function(){
    Plotly.extendTraces('dia-weight3_s2',{ y:[[data_w3_s2]]}, [0]);
    cnt++;
    if(cnt > 300) {
        Plotly.relayout('dia-weight3_s2',{
            xaxis: {
                range: [cnt-300,cnt]
            }
        });
    }
},1000);
