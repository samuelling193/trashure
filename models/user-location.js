//var x = document.getElementById("demo");

let userLocation = {};

function getLocation() {
  if (navigator.geolocation) {
      //console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(showPosition);
  } 
//   else {
//     //x.innerHTML = "Geolocation is not supported by this browser.";
//   }
}

function showPosition(position) {
    console.log(position)
    userLocation = {"latitude": position.coords.latitude,
  "longitude": position.coords.longitude}
  console.log(userLocation)
  return userLocation
}

let loc = getLocation()
// console.log(location)


// module.exports = {
//     location: getLocation,

// }

//center: new Microsoft.Maps.Location(51.50632, -0.12714)

//center: new Microsoft.Maps.Location(location.latitude, location.longitude)
