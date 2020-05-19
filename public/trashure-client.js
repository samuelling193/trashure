function getMap() {
    var map = new Microsoft.Maps.Map('#root', {
        center: new Microsoft.Maps.Location(-37.7989538, 144.9597395)
    });
    
    var center = map.getCenter()

    // Create custom Pushpin
    var pin  = new Microsoft.Maps.Pushpin(center, {
        title: 'Melbourne',
        subTitle: 'City Center',
        text: '1'
    })
}