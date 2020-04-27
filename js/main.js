
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


// -------------- Getting Worldwide Data -------------

$(document).ready(function () {
    $.getJSON('https://api.covid19india.org/data.json', function (data) {

        // Getting Card Data
        $("#wconfirmed").append(data.statewise[0].confirmed); //Total Confirmed
        $("#wactive").append(data.statewise[0].active); //Total Active
        $("#wrecovered").append(data.statewise[0].recovered); //Total Recovered
        $("#wdeceases").append(data.statewise[0].deaths); //Total Deceases



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


        let chartConfirm = document.getElementById("wgraph-confirm").getContext("2d");
        let chartActive = document.getElementById("wgraph-active").getContext("2d");
        let chartRecover = document.getElementById("wgraph-recover").getContext("2d");
        let chartDecease = document.getElementById("wgraph-decease").getContext("2d");

        Chart.defaults.global.legend = false;

        makeChart(chartConfirm, time_confirmed, time_dates, "Confirmed");
        makeChart(chartActive, time_active, time_dates, "Active");
        makeChart(chartRecover, time_recovered, time_dates, "Recovered");
        makeChart(chartDecease, time_deaths, time_dates, "Deceases");

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
