console.log(cityGrowths);

// Sort cities in descending order  
var sortedCities = cityGrowths.sort((a,b) =>
a.Increase_from_2016 - b.Increase_from_2016).reverse(); 

// Slice top 5 cities
var topFiveCities = sortedCities.slice(0,5);

// Separate into top 5 cities and top 5 growth figures
var topFiveCityNames = cityGrowths.map(city => city.City);
var topFiveCityGrowths = cityGrowths.map(city => parseInt(city.Increase_from_2016));

// Create a bar chart with arrays
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);

  // 12.3.2 
  d3.json("samples.json").then(function(data){
    console.log(data);
});

// Frequency of washing belly button weekly by person, sort descending, remove nulls
d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
  filteredWfreq = wfreq.filter(element => element !=
null);
  console.log(filteredWfreq);
});

// Display the metadata of any individual from the dataset; Entries returns key/value pairs
d3.json("samples.json").then(function(data){
  firstPerson = data.metadata[0];
  Object.entries(firstPerson).forEach(([key, value]) =>
    {console.log(key + ': ' + value);});
});