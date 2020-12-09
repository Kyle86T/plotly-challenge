
//Creating the function to pull names from json file and add them in the filter
var drawChart = function(x_values, y_values, hoverText, metadata) {
    var data_panel = d3.select("#sample-metadata");
    data_panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        data_panel.append("p").text(`${key}: ${value}`);
    });
    //Creating the bar chart  
    var trace = {
        x: x_values,
        y: y_values,
        text: hoverText,
        type: 'bar',
        orientation: 'h'
    };
    //Creating the Trace    
    var data = [trace];
    //Plotting the bar chart under the bar id
    Plotly.newPlot('bar', data);
    //Creating the bubble chart
    var trace2 = {
        x: x_values,
        y: y_values,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: y_values,
            color: x_values
        }
    };
  //Creating the Trace
    var data2 = [trace2];
  //Plotting the chart
    Plotly.newPlot('bubble', data2);
  //Creating the Gauge Chart
    var tracePie = {
        labels: x_values,
        values: y_values,
        type:"pie",
    }
    //Creating the Trace
    var data3 = [tracePie]
    //Plotting the Gauge chart. I can't seem to get it to display correctly
    Plotly.newPlot("gauge", data3)
  };
    var dropDown = function(names) {
    var selectTag = d3.select("#selDataset");
    var options = selectTag.selectAll('option').data(names);
//Creating the on-use optino  
    options.enter()
        .append('option')
        .attr('value', function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });
  };
  //Script to update when selection is changed
  var selectChange = function(newValue) {
      d3.json("data/samples.json").then(function(data) {
      sample_new = data["samples"].filter(function(sample) {
          return sample.id == newValue;
      });
    metadata_new = data["metadata"].filter(function(metadata) {
        return metadata.id == newValue;
    });
    x_values = sample_new[0]["otu_ids"];
    y_values = sample_new[0]["sample_values"];
    hoverText = sample_new[0]["otu_labels"];
//Logging the results to see if they are correct    
    console.log(x_values);
    console.log(y_values);
    console.log(hoverText);
    
    drawChart(x_values, y_values, hoverText, metadata_new[0]);
    });
  };
  
  d3.json("data/samples.json").then(function(data) {
    //Pull names to pop the dropDown menu
    dropDown(data["names"]);
    //Return the first value for out, sample_value and out_labels
    x_values = data["samples"][0]["otu_ids"];
    y_values = data["samples"][0]["sample_values"];
    hoverText = data["samples"][0]["otu_labels"];
    metadata = data["metadata"][0];
    //Draw the chart on load
    drawChart(x_values, y_values, hoverText, metadata);
});