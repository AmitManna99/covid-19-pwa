
// ------------ Make Chart --------------

function makeChart(chartCTX, data, dates, type) {

    let brColor;
    
    switch(type) {
        case "Confirmed":
            brColor = "#FF3F66";
            break;
        case "Active":
            brColor = "#027DFF";
            break;
        case "Recovered":
            brColor = "#2AA747";
            break;
        case "Deceases":
            brColor = "#767F85";
            break;
    }
    
    let chart = new Chart(chartCTX, {
        type: "line",
        data: {
            labels: dates.slice(-21, -1),
            datasets: [
                {
                    label: type,
                    data: data.slice(-21, -1),
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: brColor
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    display: true
                }],
                xAxes: [{
                    display: false
                }]
            }
        }
    });
}

$(document).ready(function () {
    $.getJSON('https://api.covid19india.org/data.json', function (data) {

        // Getting Card Data
        $("#confirmed").append(data.statewise[0].confirmed); //Total Confirmed
        $("#active").append(data.statewise[0].active); //Total Active
        $("#recovered").append(data.statewise[0].recovered); //Total Recovered
        $("#deceases").append(data.statewise[0].deaths); //Total Deceases



        //-----------------Time Series Data------------------

        const time_confirmed = [];
        const time_recovered = [];
        const time_deaths = [];
        const time_active = [];
        const time_dates = [];

        $.each(data.cases_time_series, function (id, obj) {
            time_confirmed.push(obj.dailyconfirmed);
            time_deaths.push(obj.dailydeceased);
            time_recovered.push(obj.dailyrecovered);
            time_active.push(obj.dailyconfirmed - obj.dailydeceased - obj.dailyrecovered);
            time_dates.push(obj.date);
        });


        let chartConfirm = document.getElementById("graph-confirm").getContext("2d");
        let chartActive = document.getElementById("graph-active").getContext("2d");
        let chartRecover = document.getElementById("graph-recover").getContext("2d");
        let chartDecease = document.getElementById("graph-decease").getContext("2d");

        Chart.defaults.global.legend = false;

        makeChart(chartConfirm, time_confirmed, time_dates, "Confirmed");
        makeChart(chartActive, time_active, time_dates, "Active");
        makeChart(chartRecover, time_recovered, time_dates, "Recovered");
        makeChart(chartDecease, time_deaths, time_dates, "Deceases");



        // ------------ Getting Table Data ---------------

        const stateList = document.querySelector('#state-list');

        $.each(data.statewise, function(id,obj) {
            
            let tr = document.createElement('tr');
            let state = document.createElement('td');
            let confirm = document.createElement('td');
            let active = document.createElement('td');
            let recover = document.createElement('td');
            let decease = document.createElement('td');

            tr.setAttribute('data-id', id);

            state.textContent = obj.state;
            state.style.color = "white";

            confirm.textContent = obj.confirmed;
            confirm.setAttribute("class", "red-covid");

            active.textContent = obj.confirmed - obj.recovered - obj.deaths;
            active.setAttribute("class", "blue-covid");

            recover.textContent = obj.recovered;
            recover.setAttribute("class", "green-covid");

            decease.textContent = obj.deaths;
            decease.setAttribute("class", "gray-covid");



            tr.appendChild(state);
            tr.appendChild(confirm);
            tr.appendChild(active);
            tr.appendChild(recover);
            tr.appendChild(decease);

            stateList.appendChild(tr);

        });
    });
});



// Headmap with Mapbox

mapbox_token = "pk.eyJ1IjoiYW1pdG05OSIsImEiOiJjazlkejExcmEwMGhqM2ZvYmlrbnhrY2s4In0.Da6mYNzOOFPQZ8LqLYs2OA";

mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1
});

map.on('load', function () {
    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.
    map.addSource('earthquakes', {
        'type': 'geojson',
        'data':
            'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
    });

    map.addLayer(
        {
            'id': 'earthquakes-heat',
            'type': 'heatmap',
            'source': 'earthquakes',
            'maxzoom': 9,
            'paint': {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'mag'],
                    0,
                    0,
                    6,
                    1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    9,
                    3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    2,
                    9,
                    20
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    1,
                    9,
                    0
                ]
            }
        },
        'waterway-label'
    );

    map.addLayer(
        {
            'id': 'earthquakes-point',
            'type': 'circle',
            'source': 'earthquakes',
            'minzoom': 7,
            'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                    16,
                    ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'mag'],
                    1,
                    'rgba(33,102,172,0)',
                    2,
                    'rgb(103,169,207)',
                    3,
                    'rgb(209,229,240)',
                    4,
                    'rgb(253,219,199)',
                    5,
                    'rgb(239,138,98)',
                    6,
                    'rgb(178,24,43)'
                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    0,
                    8,
                    1
                ]
            }
        },
        'waterway-label'
    );
});
