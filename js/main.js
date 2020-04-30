// Tab Selector
var el = document.querySelector('.tabs');
var instance = M.Tabs.init(el, {});
/*
// Function for Capitalize Each Word
function titleCase(str) {
    console.log(str);
    var splitStr = str.split(" ");

    for (var i = 0; i < splitStr.length; i++) {
        if (splitStr.length[i] < splitStr.length) {
            splitStr[i].charAt(0).toUpperCase();
        }

        str = splitStr.join(" ");
    }
    console.log(str);
    return str;
}
  */

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
            labels: dates.slice(-22,),
            datasets: [
                {
                    label: type,
                    data: data.slice(-22,),
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: brColor
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        display: false
                    }
                }],
                xAxes: [{
                    display: false
                }]
            }
        }
    });
}


// -------------- Getting Indian Data -------------

$(document).ready(function () {
    $.getJSON('https://api.covid19india.org/data.json', function (data) {

        
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

        //console.log(time_confirmed,time_active,time_dates,time_deaths,time_recovered);


        // Getting Card Data
        $("#confirmed").append(data.statewise[0].confirmed); //Total Confirmed
        $("#del-confirmed").append('[' + data.statewise[0].deltaconfirmed + ']'); 

        $("#active").append(data.statewise[0].active); //Total Active

        $("#recovered").append(data.statewise[0].recovered); //Total Recovered
        $("#del-recovered").append('[' + data.statewise[0].deltarecovered + ']');

        $("#deceases").append(data.statewise[0].deaths); //Total Deceases
        $("#del-deaths").append('[' + data.statewise[0].deltadeaths + ']');



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

            active.textContent = obj.active;
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


// -------------- Getting Worldwide Data -------------

$(document).ready(function () {

    // Getting Total Cases
/*
    fetch("https://covid1935.p.rapidapi.com/api/v1/current", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid1935.p.rapidapi.com",
            "x-rapidapi-key": "f3fe549e87msh054dcee16b82229p11cc3ajsn69121657c69d"
        }
    })
        .then(response => response.json().then(data => {
            
            // ------------ Getting Table Data ---------------
            //console.log(data);
            const countryList = document.querySelector('#country-list');

            //data.countries_stat.shift();
            $.each(data, function (id, obj) {

                if (obj.country == "world")
                    continue;
                    
                let tr = document.createElement('tr');
                let country = document.createElement('td');
                let confirm = document.createElement('td');
                let active = document.createElement('td');
                let recover = document.createElement('td');
                let decease = document.createElement('td');

                tr.setAttribute('data-id', id);

                tempName = obj.country.replace(/-/g," ");
                country.textContent = tempName.toUpperCase();
                console.log(country.textContent);
                country.style.color = "white";

                confirm.textContent = obj.data.cases;
                confirm.setAttribute("class", "red-covid");

                active.textContent = obj.data.cases - obj.data.recovered - obj.data.deaths;
                active.setAttribute("class", "blue-covid");

                recover.textContent = obj.data.recovered;
                recover.setAttribute("class", "green-covid");

                decease.textContent = obj.data.deaths;
                decease.setAttribute("class", "gray-covid");



                tr.appendChild(country);
                tr.appendChild(confirm);
                tr.appendChild(active);
                tr.appendChild(recover);
                tr.appendChild(decease);

                countryList.appendChild(tr);
            });

        }))
        .catch(err => {
            console.log(err);
        });
*/

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "f3fe549e87msh054dcee16b82229p11cc3ajsn69121657c69d"
        }
    })
        .then(response =>response.json().then( data =>{

            $("#wconfirmed").append(data.total_cases); //Total Confirmed
            $("#wdel-confirmed").append('[' + data.new_cases + ']');

            $("#wactive").append(data.active_cases); //Total Active

            $("#wrecovered").append(data.total_recovered); //Total Recovered

            $("#wdeceases").append(data.total_deaths); //Total Deceases
            $("#wdel-deaths").append('[' + data.new_deaths + ']');
        }))
        .catch(err => {
            console.log(err);
        });

    // Getting Cases by Country
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "f3fe549e87msh054dcee16b82229p11cc3ajsn69121657c69d"
        }
    })
        .then(response => response.json().then(data => {
            
            // ------------ Getting Table Data ---------------

            const countryList = document.querySelector('#country-list');

            data.countries_stat.shift();
            $.each(data.countries_stat, function (id, obj) {

                let tr = document.createElement('tr');
                let country = document.createElement('td');
                let confirm = document.createElement('td');
                let active = document.createElement('td');
                let recover = document.createElement('td');
                let decease = document.createElement('td');

                tr.setAttribute('data-id', id);

                country.textContent = obj.country_name;
                country.style.color = "white";

                confirm.textContent = obj.cases;
                confirm.setAttribute("class", "red-covid");

                active.textContent = obj.active_cases;
                active.setAttribute("class", "blue-covid");

                recover.textContent = obj.total_recovered;
                recover.setAttribute("class", "green-covid");

                decease.textContent = obj.deaths;
                decease.setAttribute("class", "gray-covid");



                tr.appendChild(country);
                tr.appendChild(confirm);
                tr.appendChild(active);
                tr.appendChild(recover);
                tr.appendChild(decease);

                countryList.appendChild(tr);
            });

        }))
        .catch(err => {
            console.log(err);
        });
});


// Cluster Map with Mapbox

mapbox_token = "pk.eyJ1IjoiYW1pdG05OSIsImEiOiJjazlkejExcmEwMGhqM2ZvYmlrbnhrY2s4In0.Da6mYNzOOFPQZ8LqLYs2OA";

mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 2
});

map.on('load', function() {

    map.addSource('coronavirus', {
        type: 'geojson',
        data:
            'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson',
        cluster: true,
        clusterMaxZoom: 14, 
        clusterRadius: 50
    });
     
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'coronavirus',
        filter: ['has', 'Confirmed'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'Confirmed'],
                'rgba(235,0,10,0.35)',
                500,
                'rgba(235,0,10,0.45)',
                1500,
                'rgba(235,0,10,0.55)',
                5000,
                'rgba(235,0,10,0.65)',
                10000,
                'rgba(235,0,10,0.75)',
                20000,
                'rgba(235,0,10,0.85)',
                30000,
                'rgba(235,0,10,1)'
            ],
            'circle-radius': [
                'step',
                ['get', 'Confirmed'],
                20,
                100,
                40,
                750,
                50
            ]
        }
    });
     
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'coronavirus',
        filter: ['has', 'Confirmed'],
        layout: {
            'text-field': "{Confirmed}",
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'coronavirus',
        filter: ['!', ['has', 'Confirmed']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
    
});


