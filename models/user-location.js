let userLocation = {"latitude": -38.814629, "longitude": 144.963384};

function getLocation() {
  if (navigator.geolocation) {
      console.log(userLocation)
      navigator.geolocation.getCurrentPosition(showPosition);


  } else {
        //For ERROR Handling
        // If user or browser blocks location sharing, then default userLocation is center of Melboure
        userLocation = {"latitude": -37.814629, "longitude": 144.963384}
    }
}

function showPosition(position) {
    //console.log(position)

    userLocation = {
        "latitude": position.coords.latitude, 
        "longitude": position.coords.longitude
    }
    //console.log(userLocation)
    
}

module.exports = {
    getLocation: getLocation(),
    userLocation: userLocation
}


// For client.js file

//const userLocation = require('./public/user-location.js')

// replace 'center: new Microsoft.Maps.Location(51.50632, -0.12714)' with below

//center: new Microsoft.Maps.Location(userLocation.latitude, userLocation.longitude)

// //For HTML File
//<body onload="getLocation()"></body>
