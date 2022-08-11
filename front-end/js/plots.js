// Show the path for the data
data = "https://cars-project.s3.amazonaws.com/file.json"
function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selMake");

  // Use the list of sample names to populate the select options
  d3.json("vehicles.json").then((data) => {
    var makeNames = data.names;

    makeNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json(dataFile).then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
                    //>---<Begin Del. 1>---<\\

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json(dataFile).then((data) => {

    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesArray.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // Note: the following code was created with the present help of classmate Joe Eck and can be found 
    //       in the charts.js file. Source: "https://github.com/JleMxe/Belly_Button_Biodiversity/blob/main/charts.js"
    var bar_otu_ids = otu_ids.slice(0,10).reverse();
    var bar_otu_labels = otu_labels.slice(0,10).reverse();
    var bar_sample_values = sample_values.slice(0,10).reverse();
    
    // .map() through the bar otu ids and append them to the end of the string with an arrow func.
    var yticks = bar_otu_ids.map(ytick => "OTU " + ytick);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: bar_sample_values,
      y: yticks,
      text: bar_otu_labels,
      type: "bar",
      orientation: "h"  
    }];

    // 9. Create the layout for the bar chart. 
    // Note: Margin layout source: "https://plotly.com/javascript/setting-graph-size/"
    var barLayout = {
      title: '<b>' + '<span style="font-size: 17px;">10 Most Frequent Bacteria Cultures',
      xaxis: {title:""},
      yaxis: {title:""},
      margin: {
        l: 80,
        r: 60,
        b: 100,
        t: 100
      }
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar-plot", barData, barLayout);

                     //>---<End Del. 1>---<\\
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
                    //>---<Begin Del. 2>---<\\

  // 2.1) Create the trace for the bubble chart. 
  // Note: Marker styling source: "https://plotly.com/javascript/marker-style/" 
  var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      color: otu_ids,
      size: sample_values,
      // line: {
      //   color: 'rgb(220, 255, 255)',
      //   width: 4
      //}
    }
    }];

  // 2.2) Create the layout for the bubble chart.
  var bubbleLayout = {
    title: '<b>' + '<span style="font-size: 12px;">Number of Bacteria Culture Units per Sample',
    xaxis: {title:"OTU ID."},
    yaxis: {title:""},
    margin: {
      l: 80,
      r: 80,
      b: 100,
      t: 100
    }
  };
      
  // 2.3) Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout); 

                       //>---<End Del. 3>---<\\
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
                      //>---<Begin Del. 3>---<\\
  
  // 3.1) Create a variable that filters the metadata array for the sample number passed in.
  var metaData = data.metadata;
  var resultArray2 = metaData.filter(sampleObj => sampleObj.id == sample);

  // 3.2) Create a variable that holds the first sample in the array created in Step 2.
  var result2 = resultArray2[0];

  // 3.3) Create a variable that converts the washing frequency to a floating point number
  var wfreq = result2.wfreq;

  // 3.4) Create the trace object for the guage chart.
  var gaugeData = [{
    type: "indicator",
    mode: "gauge+number",
    value: wfreq,
    gauge:{
      tickmode: "array",
      tickvals: [0,2,4,6,8,10],
      bar: { color: "black"},
      axis:{
        range:[null,10],
        dtick: "2",
      },
      steps:[
        {range: [0,2],color: "red"},
        {range: [2,4],color: "orange"},
        {range: [4,6],color: "yellow"},
        {range: [6,8],color: "lightgreen"},
        {range: [8,10],color: "green"}
        ]
      } 
  }];
      
  // Note: the following code block was made with the present help of classmate Joe Eck and can be found
  //       in lines 175-194 in the charts.js file here. Source: "https://github.com/JleMxe/Belly_Button_Biodiversity/blob/main/charts.js"

  // 5. Create the layout for the gauge chart (making sure that it fits in the <div></div> tag for the gauge id.)
  
  // syntax to break line found at: https://stackoverflow.com/questions/35185143/how-to-create-new-line-in-plot-ly-js-title
  // syntax to make a line bold found at: https://www.tutorialspoint.com/How-to-make-text-bold-in-HTML#:~:text=To%20make%20text%20bold%20in%20HTML%2C%20use%20the,strong%20importance%20to%20the%20text.
  // syntax for font change found at: https://stackoverflow.com/questions/57919281/using-multiple-font-sizes-in-plotly-chart-title-python
  var gaugeLayout = { 
    title: '<b>' + '<span style="font-size: 20px;">Belly Button Washing Frequency</span>'+ 
    '</b>' + '<br>' + '<span style="font-size: 20px;">Scrubs Per Week</span>',
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 65
    }
  };

  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot("gauge-plot",gaugeData,gaugeLayout);

  }); //END OF CODE
}
