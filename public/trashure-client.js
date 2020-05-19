console.log("trashure client js successfully connected")

function getMap() {
    var map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(-37.7989538, 144.9597395)
    });
    
    // var center = map.getCenter()

    // Create custom Pushpin
    var pin  = new Microsoft.Maps.Pushpin(center, {
        title: 'Melbourne',
        subTitle: 'City Center',
        text: '1'
    })


    Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
        let getInformationAboutItem = e.target._options.title
        console.log(getInformationAboutItem)
        document.querySelector('.description-of-item').textContent = getInformationAboutItem
    })
    
    // Add the pushpin to the map
    map.entities.push(pin);
}