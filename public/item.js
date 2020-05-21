console.log('item.js is linked')

const itemAddress = document.querySelector('.item-location')
const itemLatitude = document.querySelector('.lat')
const itemLongitude = document.querySelector('.long')
const itemLocation = document.querySelector('.item-location')

var map, searchManager, address, infobox 
var item_location = {}

const reverseGeocode = function(e) {
    // infobox.setMap(null)
    itemAddress.value = '';
    if (map.entities != []) {
        map.entities.clear();        
    }
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the reverseGeocode function again.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            reverseGeocode();
        });
    } else {
        
        var searchRequest = {
            // local arguement to be passed in
            location: e.location,
            callback: function (res) {
                //Tell the user the name of the result.
                itemAddress.value = res.name;
                itemLatitude.value = res.location.latitude;
                itemLongitude.value = res.location.longitude;
                
                infobox = new Microsoft.Maps.Infobox(e.location, { 
                    title: 'Address', 
                    description: res.name, 
                    latitude: res.location.latitude,
                    longitude: res.location.longitude
                });
                infobox.setMap(map);
                console.log(infobox)
                setTimeout(function () { infobox.setMap(null) }, 2000);
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                alert("Unable to reverse geocode location.");
            }
        };

        //Make the reverse geocode request.
        searchManager.reverseGeocode(searchRequest);
        
        var pin = new Microsoft.Maps.Pushpin(e.location, {
            // title: address
            // color: 'green'
            
        })
        map.entities.push(pin);
        console.log(map.entities)
    }
}

function getMap() {
    map = new Microsoft.Maps.Map('.item-map', {
                                            // user location 
        center: new Microsoft.Maps.Location(-37.7989538, 144.9597395)
    });

    Microsoft.Maps.Events.addHandler(map, 'click', (e) => {
        reverseGeocode(e)
    })
}

