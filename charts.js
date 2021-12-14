function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
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
  d3.json("samples.json").then((data) => {
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

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data)
    // 3. Create a variable that holds the samples array. 
    var sample_array = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sample_number = sample_array.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var first_sample_array = sample_number[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = first_sample_array.otu_ids;
    var otu_labels = first_sample_array.otu_labels;
    var sample_values = first_sample_array.sample_values;

    var frequency = parseFloat(metadata.wfreq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.
    // map is for labeling
    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [
    {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
    }
  ];

    // var data = [barData];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {5: 30, l:150}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

// 1. Create the trace for the bubble chart.
    var bubbleData = 
    [
      {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        scale: "Earth"
      }
    }
  ];

    //     2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: "City" },
      height: 600,
      width: 600,
      hovermode: "closest"
    }; 

     Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: frequency,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black"},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
    ];
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      width: 500,
      height: 425,
      margin: { t: 0, b: 0 } };
    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}

// // Bar and Bubble charts
// // Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
    

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot(); 

//     // 1. Create the trace for the bubble chart.
//     var bubbleData = {
//       x: otu_ids,
//       y: sample_values,
//       text: 'otu_labels',
//       mode: 'markers',
//       marker: {
//         size:,
//         color:,
//         scale:
//       }
//     };

//     var data = [bubbleData];
//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
//       title: 'Bacteria Cultures Per Sample',
//       xaxis: {title: "City" },
//       height: 600,
//       width: 600,
//       hovermode = TRUE
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot("bubble-plot", bubbleData, bubbleLayout); 
//   });
// }

// function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//   d3.json("samples.json").then((data) => {
//     console.log(data);

//     // Create a variable that holds the samples array. 

//     // Create a variable that filters the samples for the object with the desired sample number.

//     // 1. Create a variable that filters the metadata array for the object with the desired sample number.

//     // Create a variable that holds the first sample in the array.
  

//     // 2. Create a variable that holds the first sample in the metadata array.
    

//     // Create variables that hold the otu_ids, otu_labels, and sample_values.


//     // 3. Create a variable that holds the washing frequency.
   
//     // Create the yticks for the bar chart.

//     // Use Plotly to plot the bar data and layout.
//     Plotly.newPlot();
    
//     // Use Plotly to plot the bubble data and layout.
//     Plotly.newPlot();
   
    
//     // 4. Create the trace for the gauge chart.
//     var gaugeData = [
     
//     ];
    
//     // 5. Create the layout for the gauge chart.
//     var gaugeLayout = { 
     
//     };

//     // 6. Use Plotly to plot the gauge data and layout.
//     Plotly.newPlot();
//   });