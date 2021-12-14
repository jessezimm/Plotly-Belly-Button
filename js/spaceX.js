const url = "https://api.spacexdata.com/v2/launchpads";

// Call API and print data
d3.json(url).then(receivedData => console.log(receivedData));