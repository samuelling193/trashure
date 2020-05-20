console.log("trashure client js successfully connected")

//gets user location from browser

function getLocation(cb) {
  if (navigator.geolocation) {
      //console.log(userLocation)
      navigator.geolocation.getCurrentPosition((position) => showPosition(position, cb));


  } else {
        //For ERROR Handling
        // If user or browser blocks location sharing, then default userLocation is center of Melboure
        var userLocation = {"latitude": -37.814629, "longitude": 144.963384}

        cb(userLocation)
    }
}

function showPosition(position, cb) {

    var userLocation = {
        "latitude": position.coords.latitude, 
        "longitude": position.coords.longitude
    }

    cb(userLocation)
    //console.log(userLocation) 
}

// Fetches information to be displayed
const handlePinClick = function (e) {
    const url = `http://localhost:8080/api/trashure_items/${e.target._options.text}`
    axios.get(url).then(res => {
        res.data.forEach(function(data) {
        
        document.querySelector(".name-of-item").textContent = `Name: ${data.name}`
        document.querySelector(".quantity-of-item").textContent = 'Quantity: 1'
        document.querySelector(".location-of-item").textContent = 'Address: Need to get Address from lat % long'
        
        const url = `http://localhost:8080/api/users/${data.owner_id}`
        axios.get(url).then(res => {
            document.querySelector(".owner-of-item").textContent = `Owner: ${res.data[0].name}`
        })
        document.querySelector(".expiration-date-of-item").textContent = `Expiration Date: ${data.expiration_date}`
        document.querySelector(".pickup-date-of-item").textContent = `Pickup Date: ${data.pickup_date}`
        document.querySelector(".pickup-time-of-item").textContent = `Pickup Time: ${data.pickup_start_time}`
        })
    })
}

function getMap() {

    getLocation(function (userLocation){

        var map = new Microsoft.Maps.Map('#map', {
                                                // user location 
            center: new Microsoft.Maps.Location(userLocation.latitude, userLocation.longitude),
            zoom: 10
        });

        var center = map.getCenter()
        console.log(center)

        const url = 'http://localhost:8080/api/trashure_items'

        axios.get(url).then(res => {
            res.data.forEach(function(data) {
                var location = { latitude: data.lat, longitude: data.long}
                pin = new Microsoft.Maps.Pushpin(location, {
                    title: data.name,
                    text: `${data.id}`
                })
                map.entities.push(pin)
                
                // Handles the click event of a pin, note changes textContent of Div to display it
                Microsoft.Maps.Events.addHandler(pin, 'click', handlePinClick)
            })
        })
        

        // Create custom Pushpin
        // var pin  = new Microsoft.Maps.Pushpin(center, {
        //     title: 'Melbourne',
        //     subTitle: 'City Center',
        //     text: '1'
        // })

        // Fetches information to be displayed
        const getInformationAboutItem = (e) => { 
            // Needs the right information
            return(e.target._options.itemId) 
        }

        axios.get(url).then(res => {
            res.data.forEach(function(data) {
                var location = { 
                    latitude: data.lat, 
                    longitude: data.long
                }
                pin = new Microsoft.Maps.Pushpin(location, {
                    title: data.name,
                    text: `${data.id}`
                })
                map.entities.push(pin)
                
                // Handles the click event of a pin, note changes textContent of Div to display it
                Microsoft.Maps.Events.addHandler(pin, 'click', handlePinClick)
            })
        })
    })
}