var map, mymap

if (document.getElementById('map')){

    var mymap = L.map('map').setView([42.505, 43.09], 7);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoiam56LWR2IiwiYSI6ImNrYXdnb3A4cDFtc3UydW1zbHEyazJ1emMifQ.2dgqGcHBEQn32zRtOL00gg'
        }).addTo(mymap);
        
}
let markers = []

const drow_map = () => {
    markers.forEach(m => m.remove())
    let active_locations = global_data.locations.filter(location => global_filters.locations.indexOf(location.title) > -1)
    let posts_per_location = {}

    active_locations.forEach((location, loc_index) => {
        posts_per_location[location.title] = filtered_data.posts.filter(p => p.locations.indexOf(location.title) > -1 )
    })
    //TODO count, or likes, or comments
    // let posts_count_per_location = Object.keys(posts_per_location).map(location_title => posts_per_location[location_title].length)
    
    // posts_count_per_location = posts_count_per_location.sort()

    // max_count = posts_count_per_location[0] - posts_count_per_location[posts_count_per_location.length - 1]
    // console.log(max_count)

    // max_count  -- 40000
    // n         -- x

    active_locations.forEach((location, loc_index) => {
        let posts_for_loc = posts_per_location[location.title]
        // console.log(posts_for_loc.length)
        let circle = L.circle([location.lat, location.long], {
            color: colors[loc_index],
            fillColor: colors[loc_index],
            fillOpacity: 0.5,
            radius: 250 * posts_for_loc.length
        }).addTo(mymap);
        markers.push(circle)
    })
}