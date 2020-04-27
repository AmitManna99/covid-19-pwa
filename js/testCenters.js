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

// -------------Search Bar Function --------------
const searchBar = document.getElementById('search-labs');

searchBar.addEventListener('keyup'||'keydown', function(e) {

    const term = e.target.value.toLowerCase();
    const labs = document.getElementsByTagName('tr');
    var head = document.getElementById('labs-header');

    Array.from(labs).forEach(function(lab){
        console.log(lab.textContent)
        if(lab.textContent.toLowerCase().indexOf(term) != -1 && lab.textContent.toLowerCase().indexOf(head) == -1 ) {
            //lab.style.display = 'block';
            //var head = document.getElementById('labs-header');
            head.style.display = 'block';
        }
        else {
            lab.style.display = 'none';
        }
    });
});