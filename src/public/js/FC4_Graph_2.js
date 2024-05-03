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
  name: "Weight 2",
  line: { color: "#0000ff" },
};
var trace3_s2 = {
  x: [],
  y: [data_w3_s2],
  mode: "lines+markers",
  name: "Weight 3",
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
    range: [new Date(Date.now() - 20 * 1000), new Date(Date.now() + 20 * 1000)],
  },
  font: {
    family: "Montserrat",
    size: 12,
    weight: "bold",
  },
  showlegend: true,
  xaxis: {fixedrange: true},
  yaxis: {fixedrange: true},
};

// // Draw Chart
// STATION 2
var timeRange1_s2 = [
  new Date(Date.now() - 20 * 1000),
  new Date(Date.now() + 20 * 1000),
];
var timeRange2_s2 = [
  new Date(Date.now() - 20 * 1000),
  new Date(Date.now() + 20 * 1000),
];
var timeRange3_s2 = [
  new Date(Date.now() - 20 * 1000),
  new Date(Date.now() + 20 * 1000),
];
Plotly.newPlot("dia-weight1_s2", [trace1_s2], layout_s2, {
  responsive: true,
  displayModeBar:false,
  modeBarButtonsToRemove: ['toImage','pan2d','autoScale2d','select2d','lasso2d','zoom2d','zoomIn2d','zoomOut2d']
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
  displayModeBar:false,
  modeBarButtonsToRemove: ['toImage','pan2d','autoScale2d','select2d','lasso2d','zoom2d','zoomIn2d','zoomOut2d']
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
  displayModeBar:false,
  modeBarButtonsToRemove: ['toImage','pan2d','autoScale2d','select2d','lasso2d','zoom2d','zoomIn2d','zoomOut2d']
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
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var timestamp =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  Plotly.downloadImage("dia-weight1_s2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_1_" + timestamp,
  });
}
function DownloadGraph2_s2() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var timestamp =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  Plotly.downloadImage("dia-weight2_s2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_2_" + timestamp,
  });
}
function DownloadGraph3_s2() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var timestamp =
    year +
    "_" +
    month +
    "_" +
    date +
    "_" +
    hours +
    "h" +
    minutes +
    "m" +
    seconds +
    "s";
  Plotly.downloadImage("dia-weight3_s2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_3_" + timestamp,
  });
}

function DownloadGraph1_s2_x() {
  var graphDiv = document.getElementById("dia-weight1_s2");

  Plotly.toImage(graphDiv, {
    format: "png",
    height: 800,
    width: 1300,
  })
    .then(function (url) {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      var timestamp =
        year +
        "_" +
        month +
        "_" +
        date +
        "_" +
        hours +
        "h" +
        minutes +
        "m" +
        seconds +
        "s";
      var data = {
        img: url,
        filename: "st2_weight_1_" + timestamp,
      };

      fetch("/saveImage2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}
function DownloadGraph2_s2_x() {
  var graphDiv = document.getElementById("dia-weight2_s2");

  Plotly.toImage(graphDiv, {
    format: "png",
    height: 800,
    width: 1300,
  })
    .then(function (url) {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      var timestamp =
        year +
        "_" +
        month +
        "_" +
        date +
        "_" +
        hours +
        "h" +
        minutes +
        "m" +
        seconds +
        "s";
      var data = {
        img: url,
        filename: "st2_weight_2_" + timestamp,
      };

      fetch("/saveImage2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}
function DownloadGraph3_s2_x() {
  var graphDiv = document.getElementById("dia-weight3_s2");

  Plotly.toImage(graphDiv, {
    format: "png",
    height: 800,
    width: 1300,
  })
    .then(function (url) {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      var timestamp =
        year +
        "_" +
        month +
        "_" +
        date +
        "_" +
        hours +
        "h" +
        minutes +
        "m" +
        seconds +
        "s";
      var data = {
        img: url,
        filename: "st2_weight_3_" + timestamp,
      };

      fetch("/saveImage2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}
