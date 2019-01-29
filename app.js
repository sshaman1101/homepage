 // Search on enter key event
function search(e) {
    if (e.keyCode == 13) { // Enter to open google with input
        var val = document.getElementById("search-field").value;
        document.location = "https://google.com/search?q=" + val;
    }
}

function showSearhcBar() {
    document.getElementById('search').style.display = 'flex';
    document.getElementById('search-field').focus();
}

function hideSearchBar() {
    document.getElementById('search-field').value = '';
    document.getElementById('search-field').blur();
    document.getElementById('search').style.display = 'none';
}

// Get current time and format
function getTime() {
    let date = new Date(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hour = date.getHours();

    return "" +
        (hour < 10 ? ("0" + hour) : hour) + ":" +
        (min < 10 ? ("0" + min) : min) + ":" +
        (sec < 10 ? ("0" + sec) : sec);
}

document.getElementById("search").onkeypress = (evt) => {
    return search(evt);
}

window.onload = () => {
    let xhr = new XMLHttpRequest();
    // Request to open weather map
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=524901&units=metric&appid=e5b292ae2f9dae5f29e11499c2d82ece');
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                console.log(json);
                document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + "°C";
                document.getElementById("weather-description").innerHTML = json.weather[0].description;
            } else {
                console.log('error msg: ' + xhr.status);
            }
        }
    }
    xhr.send();
    // Set up the clock
    document.getElementById("clock").innerHTML = getTime();
    // Set clock interval to tick clock
    setInterval( () => {
        document.getElementById("clock").innerHTML = getTime();
    },100);
}

document.addEventListener("keydown", event => {
    if (event.keyCode == 32) {          // Spacebar code to open search
        showSearhcBar();
    } else if (event.keyCode == 27) {   // Esc to close search
        hideSearchBar()
    }
});
