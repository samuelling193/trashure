console.log("trashure client js successfully connected")


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
    var map = new Microsoft.Maps.Map('#map', {
                                            // user location 
        center: new Microsoft.Maps.Location(-37.7989538, 144.9597395)
    });
    
    var pin 

    var center = map.getCenter()

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
}