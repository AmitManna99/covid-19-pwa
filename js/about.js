$(document).ready(function () {
    $.getJSON('../resource/about.json', function (data) {

        //console.log(data,data.main_text);
        $("#about-main").append(data.main_text);

        // Developers Names
        const devList = document.querySelector('#dev-list');

        $.each(data.developers, function(id,obj) {
            
            let tr = document.createElement('tr');
            let name = document.createElement('td');
            let repo = document.createElement('td');

            tr.setAttribute('data-id', id);
			
            name.textContent = obj.dev_name;
			name.style.color = "white";
            
            repo.innerHTML = '<a href="' + obj.github_link + '" target="_blank">GitHub</a>';

            tr.appendChild(name);
            tr.appendChild(repo);

            devList.appendChild(tr);

        });


        // Sources Names
        const srcList = document.querySelector('#src-list');

        $.each(data.sources, function(id,obj) {
            
            let tr = document.createElement('tr');
            let name = document.createElement('td');

            tr.setAttribute('data-id', id);
			            
            name.innerHTML = '<a class="white-text" href="' + obj.link + '" target="_blank">' + obj.name + '</a>';

            tr.appendChild(name);

            srcList.appendChild(tr);

        });

        
    });
});