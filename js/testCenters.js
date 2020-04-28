$(document).ready(function () {
    $.getJSON('../resource/Labs.json', function (data) {

        // ------------ Getting Table Data ---------------

		const labList = document.querySelector('#lab-list');

        $.each(data, function(id,obj) {
            
            let tr = document.createElement('tr');
            let place = document.createElement('td');
            let state = document.createElement('td');
			let org = document.createElement('td');
			let testType = document.createElement('td');

            tr.setAttribute('data-id', id);
			
            place.textContent = obj.Place;
			place.style.color = "white";
			
            state.textContent = obj.State;
            state.style.color = "white";

            org.textContent = obj.Type;
            org.style.color = "white";

            testType.textContent = obj.testType;
            testType.style.color = "white";

            tr.appendChild(place);
            tr.appendChild(state);
			tr.appendChild(testType);
			tr.appendChild(org);

            labList.appendChild(tr);

        });
    });
});


// ===========Nothing is Printing============
/*
const select = document.getElementById('sel-labType');
console.log(select.options.value)

select.addEventListener('change', function(e) {

    const term = e.options.value;
    console.log(e);
    const table = document.getElementById("lab-list");
    const labs = table.getElementsByTagName('tr');
    var head = document.getElementById('labs-header');

    Array.from(labs).forEach(function(lab){
        console.log(lab.textContent)
        if(lab.textContent.indexOf(term) != -1 && lab.textContent.indexOf(head) == -1 ) {
            lab.style.display = '';
            head.style.display = '';
        }
        else {
            lab.style.display = 'none';
        }
    });
});
*/

// ============= Printing in Consol and Showing Selected option is undefind============
function selectLab() {

    const select = document.getElementById('sel-labType');
    console.log(select.options.value);
    const term = select.options.value;
    //console.log(term);
    const table = document.getElementById("lab-list");
    const labs = table.getElementsByTagName('tr');
    var head = document.getElementById('labs-header');

    Array.from(labs).forEach(function(lab){
        console.log(lab.textContent)
        if(lab.textContent.indexOf(term) != -1 && lab.textContent.indexOf(head) == -1 ) {
            lab.style.display = '';
            head.style.display = '';
        }
        else {
            lab.style.display = 'none';
        }
    });
};


// -------------Search Bar Function --------------
const searchBar = document.getElementById('search-labs');

searchBar.addEventListener('keyup'||'keydown', function(e) {

    const term = e.target.value.toLowerCase();
    const table = document.getElementById("lab-list");
    const labs = table.getElementsByTagName('tr');
    var head = document.getElementById('labs-header');

    Array.from(labs).forEach(function(lab){
        console.log(lab.textContent)
        if(lab.textContent.toLowerCase().indexOf(term) != -1 && lab.textContent.toLowerCase().indexOf(head) == -1 ) {
            //lab.style.display = 'block';
            head.style.display = '';
        }
        else {
            lab.style.display = 'none';
        }
    });
});