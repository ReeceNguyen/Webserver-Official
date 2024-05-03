//Ctrinh đổi trạm
function doalert(e) {
  if (e.checked) {
    fn_ScreenHidden(
      "dia-weight1",
      "dia-weight2",
      "dia-weight3",
      "dia-weight1_s2",
      "dia-weight2_s2",
      "dia-weight3_s2"
    );
    fn_ScreenChange1("pag_2", "pag");
  } else {
    fn_ScreenHidden(
      "dia-weight1",
      "dia-weight2",
      "dia-weight3",
      "dia-weight1_s2",
      "dia-weight2_s2",
      "dia-weight3_s2"
    );
    fn_ScreenChange1("pag", "pag_2");
  }
}
// Trạm 1
var data_w1 = 0;
var data_w2 = 0;
var data_w3 = 0;

// Trạm 2
var data_w1_s2 = 0;
var data_w2_s2 = 0;
var data_w3_s2 = 0;
socket.on("Act_Weight_1", function (data) {
  data_w1 = data;
});
socket.on("Act_Weight_2", function (data) {
  data_w2 = data;
});
socket.on("Act_Weight_3", function (data) {
  data_w3 = data;
});
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
var trace1 = {
  x: [],
  y: [data_w1],
  mode: "lines+markers",
  name: "Weight 1",
  line: { color: "#ff0000" },
};
var trace2 = {
  x: [],
  y: [data_w2],
  mode: "lines+markers",
  name: "Weight 2",
  line: { color: "#0000ff" },
};
var trace3 = {
  x: [],
  y: [data_w3],
  mode: "lines+markers",
  name: "Weight 3",
  line: { color: "#00ff00" },
};
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
var layout = {
  title: "Station 1: Weight and Time",
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

var timeRange1 = [
  new Date(Date.now() - 20 * 1000),
  new Date(Date.now() + 20 * 1000),
];
var timeRange2 = [
  new Date(Date.now() - 20 * 1000),
  new Date(Date.now() + 20 * 1000),
];
var timeRange3 = [
  new Date(Date.now() - 20 * 1000),
  new Date(Date.now() + 20 * 1000),
];
// STATION 1
Plotly.newPlot("dia-weight1", [trace1], layout, {
  responsive: true,
  displayModeBar:false,
  modeBarButtonsToRemove: ['toImage','pan2d','autoScale2d','select2d','lasso2d','zoom2d','zoomIn2d','zoomOut2d']
});
function updateGraph_1() {
  const now = new Date();
  // Update time range
  timeRange1[0] = new Date(timeRange1[0].getTime() + 1000);
  timeRange1[1] = new Date(timeRange1[1].getTime() + 1000);

  // Update xaxis range
  Plotly.relayout("dia-weight1", {
    "xaxis.range": timeRange1,
  });

  // Add new data point
  Plotly.extendTraces("dia-weight1", { x: [[now]], y: [[data_w1]] }, [0]);
}
setInterval(updateGraph_1, 1000);

Plotly.newPlot("dia-weight2", [trace2], layout, {
  responsive: true,
  displayModeBar:false,
  modeBarButtonsToRemove: ['toImage','pan2d','autoScale2d','select2d','lasso2d','zoom2d','zoomIn2d','zoomOut2d']
});
function updateGraph_2() {
  const now = new Date();
  // Update time range
  timeRange2[0] = new Date(timeRange2[0].getTime() + 1000);
  timeRange2[1] = new Date(timeRange2[1].getTime() + 1000);

  // Update xaxis range
  Plotly.relayout("dia-weight2", {
    "xaxis.range": timeRange2,
  });

  // Add new data point
  Plotly.extendTraces("dia-weight2", { x: [[now]], y: [[data_w2]] }, [0]);
}
setInterval(updateGraph_2, 1000);

Plotly.newPlot("dia-weight3", [trace3], layout, {
  responsive: true,
  displayModeBar:false,
  modeBarButtonsToRemove: ['toImage','pan2d','autoScale2d','select2d','lasso2d','zoom2d','zoomIn2d','zoomOut2d']
});
function updateGraph_3() {
  const now = new Date();
  // Update time range
  timeRange3[0] = new Date(timeRange3[0].getTime() + 1000);
  timeRange3[1] = new Date(timeRange3[1].getTime() + 1000);

  // Update xaxis range
  Plotly.relayout("dia-weight3", {
    "xaxis.range": timeRange3,
  });

  // Add new data point
  Plotly.extendTraces("dia-weight3", { x: [[now]], y: [[data_w3]] }, [0]);
}
setInterval(updateGraph_3, 1000);

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
  // staticPlot: true,
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
function DownloadGraph1() {
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
  Plotly.downloadImage("dia-weight1", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st1_weight_1_" + timestamp,
  });
}
function DownloadGraph2() {
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
  Plotly.downloadImage("dia-weight2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st1_weight_2_" + timestamp,
  });
}
function DownloadGraph3() {
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
  Plotly.downloadImage("dia-weight3", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st1_weight_3_" + timestamp,
  });
}
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

function DownloadGraph1_x() {
  var graphDiv = document.getElementById("dia-weight1");

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
        filename: "st1_weight_1_" + timestamp,
      };

      fetch("/saveImage1", {
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
function DownloadGraph2_x() {
  var graphDiv = document.getElementById("dia-weight2");

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
        filename: "st1_weight_2_" + timestamp,
      };

      fetch("/saveImage1", {
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
function DownloadGraph3_x() {
  var graphDiv = document.getElementById("dia-weight3");

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
        filename: "st1_weight_3_" + timestamp,
      };

      fetch("/saveImage1", {
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
