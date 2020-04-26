//Function to change between tabs

function changepage(key) {

    switch(key) {

        case 1:
            document.getElementById('page_1').style.display = "block";
            document.getElementById('page_2').style.display = "none";
            document.getElementById('page_3').style.display = "none";
            document.getElementById('page_4').style.display = "none";
        break;

        case 2:
            document.getElementById('page_2').style.display = "block";
            document.getElementById('page_1').style.display = "none";
            document.getElementById('page_3').style.display = "none";
            document.getElementById('page_4').style.display = "none";
        break;

        case 3:
            document.getElementById('page_3').style.display = "block";
            document.getElementById('page_2').style.display = "none";
            document.getElementById('page_1').style.display = "none";
            document.getElementById('page_4').style.display = "none";
        break;

        case 4:
            document.getElementById('page_4').style.display = "block";
            document.getElementById('page_2').style.display = "none";
            document.getElementById('page_3').style.display = "none";
            document.getElementById('page_1').style.display = "none";
        break;


    }
}