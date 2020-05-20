console.log("trashure client js successfully connected")

function getMap() {
    var map = new Microsoft.Maps.Map('#map', {
                                            // user location 
        center: new Microsoft.Maps.Location(-37.7989538, 144.9597395)
    });
    
    var center = map.getCenter()

    const url = 'http://localhost:8080/api/trashure_items'

    axios.get(url).then(res => {
        res.data.forEach(function(data) {
            var location = { latitude: data.lat, longitude: data.lng}
            var pin  = new Microsoft.Maps.Pushpin(location, {
                title: data.name,
                itemId: data.id
            })
            map.entities.push(pin)
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

    // Handles the click event of a pin, note changes textContent of Div to display it
    Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
        document.querySelector('.description-of-item').textContent = `${getInformationAboutItem(e)}`
    })
    
    // Add the pushpin to the map
    map.entities.push(pin);
}