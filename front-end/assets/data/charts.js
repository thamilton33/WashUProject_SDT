// EXAMPLE JSON RETURN FORMAT
// var data = {
//   "results" : [{"" : index,
//       "VEHICLE_ID" : VEHICLE_ID,
//       "YEAR" : year,
//       "MAKE" : make,
//       "MODEL" : model
//       },
//       {"" : "index",
//       "VEHICLE_ID" : "V_ID",
//       "YEAR" : "year",
//       "MAKE" : "make",
//       "MODEL" : "model",
//  } ]
  // }

  function init() {
  
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("vehicle_data.json").then((data) => {
      var models = data.names;
  
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















































  // TESTS 
// const vehicle_data = "vehicle_data.json"
// fetch(vehicle_data)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })

// var model_criteria = "*"
// var model_list = []
// async function getMakes() {
//   const response = fetch(vehicle_data)
//   const model_list = response
//   console.log(response), {

//   }
// }
// var temp = []
// temp = jsonPath(vehicle_data, model_criteria).toJSONString() ;
// for (let i = 0; i < cars.length; i++) {
//   text += cars[i] + "<br>";
// }


// fetch("vehicle_data.json")
//   .then(response => response.json())
//   jsonQuery("results[MAKE].MODEL",{
//   data: data
//     })
//     .then(data =>{
//         console.log(data)
//         document.querySelector("#debug").innerText = data

// })