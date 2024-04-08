// Trạm 2
var data_w1_s2 = 0;
var data_w2_s2 = 0;
var data_w3_s2 = 0;
socket.on("Act_Weight_1_s2", function (data) {
  data_w1_s2 = data;
});
socket.on("Act_Weight_2_s2", function (data) {
  data_w2_s2 = data;
});
socket.on("Act_Weight_3_s2", function (data) {
  data_w3_s2 = data;
});
// // Data trace
var trace1_s2 = {
  x: [],
  y: [data_w1_s2],
  mode: "lines+markers",
  name: "Weight 1",
  line: { color: "#ff0000" },
};
var trace2_s2 = {
  x: [],
  y: [data_w2_s2],
  mode: "lines+markers",
  name: "Weight2",
  line: { color: "#0000ff" },
};
var trace3_s2 = {
  x: [],
  y: [data_w3_s2],
  mode: "lines+markers",
  name: "Weight3",
  line: { color: "#00ff00" },
};
// // Layout configure
var layout_s2 = {
  title: "Station 2: Weight and Time",
  yaxis: { title: "Weight", autorange: true },
  xaxis: {
    title: "Time",
    tickangle: 90,
    type: "date",
    range: [new Date(Date.now() - 100 * 1000), new Date(Date.now())],
  },
  font: {
    family: "Montserrat",
    size: 12,
    weight: "bold",
  },
  showlegend: true,
};

// // Draw Chart
// STATION 2
var timeRange1_s2 = [new Date(Date.now() - 100 * 1000), new Date(Date.now())];
var timeRange2_s2 = [new Date(Date.now() - 100 * 1000), new Date(Date.now())];
var timeRange3_s2 = [new Date(Date.now() - 100 * 1000), new Date(Date.now())];
Plotly.newPlot("dia-weight1_s2", [trace1_s2], layout_s2, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_1_s2() {
  const now = new Date();
  // Update time range
  timeRange1_s2[0] = new Date(timeRange1_s2[0].getTime() + 1000);
  timeRange1_s2[1] = new Date(timeRange1_s2[1].getTime() + 1000);

  // Update xaxis range
  Plotly.relayout("dia-weight1_s2", {
    "xaxis.range": timeRange1_s2,
  });

  // Add new data point
  Plotly.extendTraces("dia-weight1_s2", { x: [[now]], y: [[data_w1_s2]] }, [0]);
}
setInterval(updateGraph_1_s2, 1000);

Plotly.newPlot("dia-weight2_s2", [trace2_s2], layout_s2, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_2_s2() {
  const now = new Date();
  // Update time range
  timeRange2_s2[0] = new Date(timeRange2_s2[0].getTime() + 1000);
  timeRange2_s2[1] = new Date(timeRange2_s2[1].getTime() + 1000);

  // Update xaxis range
  Plotly.relayout("dia-weight2_s2", {
    "xaxis.range": timeRange2_s2,
  });

  // Add new data point
  Plotly.extendTraces("dia-weight2_s2", { x: [[now]], y: [[data_w2_s2]] }, [0]);
}
setInterval(updateGraph_2_s2, 1000);

Plotly.newPlot("dia-weight3_s2", [trace3_s2], layout_s2, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_3_s2() {
  const now = new Date();
  // Update time range
  timeRange3_s2[0] = new Date(timeRange3_s2[0].getTime() + 1000);
  timeRange3_s2[1] = new Date(timeRange3_s2[1].getTime() + 1000);

  // Update xaxis range
  Plotly.relayout("dia-weight3_s2", {
    "xaxis.range": timeRange3_s2,
  });

  // Add new data point
  Plotly.extendTraces("dia-weight3_s2", { x: [[now]], y: [[data_w3_s2]] }, [0]);
}
setInterval(updateGraph_3_s2, 1000);

// tải hình ảnh về
function DownloadGraph1_s2() {
  Plotly.downloadImage("dia-weight1_s2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_1",
  });
}
function DownloadGraph2_s2() {
  Plotly.downloadImage("dia-weight2_s2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_2",
  });
}
function DownloadGraph3_s2() {
  Plotly.downloadImage("dia-weight3_s2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_3",
  });
}
