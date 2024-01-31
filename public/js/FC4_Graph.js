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
var timeStamps = [];
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
  name: "Weight2",
  line: { color: "#0000ff" },
};
var trace3 = {
  x: [],
  y: [data_w3],
  mode: "lines+markers",
  name: "Weight3",
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
  },
  font: {
    family: "Montserrat",
    size: 12,
    weight: "bold",
  },
  showlegend: true,
};
var layout_s2 = {
  title: "Station 2: Weight and Time",
  yaxis: { title: "Weight", autorange: true },
  xaxis: {
    title: "Time",
    tickangle: 90,
    type: "date",
  },
  font: {
    family: "Montserrat",
    size: 12,
    weight: "bold",
  },
  showlegend: true,
};

// // Draw Chart
// STATION 1
Plotly.newPlot("dia-weight1", [trace1], layout, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_1() {
  const now = new Date();
  Plotly.extendTraces("dia-weight1", { x: [[now]], y: [[data_w1]] }, [0]);
}
setInterval(updateGraph_1, 1000);

Plotly.newPlot("dia-weight2", [trace2], layout, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_2() {
  const now = new Date();
  Plotly.extendTraces("dia-weight2", { x: [[now]], y: [[data_w2]] }, [0]);
}
setInterval(updateGraph_2, 1000);

Plotly.newPlot("dia-weight3", [trace3], layout, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_3() {
  const now = new Date();
  Plotly.extendTraces("dia-weight3", { x: [[now]], y: [[data_w3]] }, [0]);
}
setInterval(updateGraph_3, 1000);

// STATION 2
Plotly.newPlot("dia-weight1_s2", [trace1_s2], layout_s2, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_1_s2() {
  const now = new Date();
  Plotly.extendTraces("dia-weight1_s2", { x: [[now]], y: [[data_w1_s2]] }, [0]);
}
setInterval(updateGraph_1_s2, 1000);

Plotly.newPlot("dia-weight2_s2", [trace2_s2], layout_s2, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_2_s2() {
  const now = new Date();
  Plotly.extendTraces("dia-weight2_s2", { x: [[now]], y: [[data_w2_s2]] }, [0]);
}
setInterval(updateGraph_2_s2, 1000);

Plotly.newPlot("dia-weight3_s2", [trace3_s2], layout_s2, {
  responsive: true,
  staticPlot: true,
});
function updateGraph_3_s2() {
  const now = new Date();
  Plotly.extendTraces("dia-weight3_s2", { x: [[now]], y: [[data_w3_s2]] }, [0]);
}
setInterval(updateGraph_3_s2, 1000);

// tải hình ảnh về
function DownloadGraph1() {
  Plotly.downloadImage("dia-weight1", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st1_weight_1",
  });
}
function DownloadGraph2() {
  Plotly.downloadImage("dia-weight2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st1_weight_2",
  });
}
function DownloadGraph3() {
  Plotly.downloadImage("dia-weight3", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st1_weight_3",
  });
}
function DownloadGraph1_s2() {
  Plotly.downloadImage("dia-weight1", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_1",
  });
}
function DownloadGraph2_s2() {
  Plotly.downloadImage("dia-weight2", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_2",
  });
}
function DownloadGraph3_s2() {
  Plotly.downloadImage("dia-weight3", {
    format: "png",
    height: 800,
    width: 1300,
    filename: "st2_weight_3",
  });
}