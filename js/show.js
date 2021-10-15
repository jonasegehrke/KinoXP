const dateInput = document.querySelector(".date-input");
const timeInput = document.querySelector(".time-input");
const theaterInput = document.querySelector(".theater-input");
const dropDownMovies = document.querySelector(".drop-down-movies");
const dropDownTheaters = document.querySelector(".theater-drop-down");
const newShowBtn = document.querySelector(".new-show-btn");
const showResult = document.querySelector(".show-result");
const showInputFields = document.querySelectorAll(".form-control");
const formSelects = document.querySelectorAll(".form-select");
let theater = null;

const url = `https://kinoxp.azurewebsites.net`;
//const url = `http://localhost:8080`;

async function getShows() {
    const resp = await fetch(url + "/shows");
    const respData = await resp.json();
    addRow(respData);
}

async function deleteShow(id) {
    await fetch(url + "/show/" + id, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

async function newShow(data) {
    await fetch(url + "/show", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

async function newTheater(data) {
    let theaterTemp = null;
    await fetch(url + "/theater", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then((response) => response.json())
    .then((data) => {
        theaterTemp = data;
    }).then(() => console.log(theaterTemp))

    theater = theaterTemp;
}

function showTableHeadlines() {
    let rowCount = showResult.rows.length;
    let row = showResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `ShowId`;
    row.insertCell(1).innerHTML = `Date`;
    row.insertCell(2).innerHTML = `Time`;
    row.insertCell(3).innerHTML = `Theater`;
    row.insertCell(4).innerHTML = `Movie`;
    row.insertCell(5).innerHTML = `Duration`;
    row.insertCell(6).innerHTML = `Book`;
    row.insertCell(7).innerHTML = 'Delete <i class="uil uil-trash-alt"></i>';
    row.setAttribute("id", "table-headline");
}

function addRow(respData) {
    for (let i = 0; i < respData.length; i++) {
        let show = {
            showId: respData[i].showId,
            date: respData[i].date,
            time: respData[i].time,
            theater: respData[i].theater,
            movie: respData[i].movie
        }
        let rowCount = showResult.rows.length;
        let row = showResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = show.showId;
        row.insertCell(1).innerHTML = show.date;
        row.insertCell(2).innerHTML = show.time;
        row.insertCell(3).innerHTML = show.theater.name;
        row.insertCell(4).innerHTML = show.movie.title;
        row.insertCell(5).innerHTML = show.movie.movieDuration + " min";
        row.insertCell(6).innerHTML = `<a onclick="redirectToBooking(${show.showId})"> <button type="button" class="btn btn-secondary">Book Show</button></a>`;
        row.insertCell(7).innerHTML = `<a onclick="deleteRow(this)"> <button type="button" class="btn btn-secondary uil uil-trash-alt"></button></a>`;
    }
}

function redirectToBooking(id){
    location.replace('/html/show-booking.html?showId=' + id);
}

function deleteRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;
    deleteShow(row.childNodes[0].firstChild.nodeValue);
    table.removeChild(row);
}

if (newShowBtn) {
    newShowBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(dropDownMovies.value);
        const movie = JSON.parse(dropDownMovies.value);
        let data = {
            date: dateInput.value,
            time: timeInput.value,
            theater: theater,
            movie: movie
        }
        console.log(data);
        if (data) {
            console.log(data, " sent to REST")
            newShow(data)

            for(let i = 0; i < showInputFields.length; i++){
                showInputFields[i].value = '';
            }
            for(let i = 0; i < formSelects.length; i++){
                formSelects[i].selectedIndex = 0;
            }

            alert("Show Created!")
        }
    })
}


function fillDropDownMovies(movie, theater) {
        const el = document.createElement("option");
        el.textContent = movie.title;
        el.setAttribute("value", `{
            "id":"${movie.id}",
            "title":"${movie.title}",
            "genre":"${movie.genre}",
            "ageLimit":"${movie.ageLimit}",
            "movieDuration":"${movie.movieDuration}",
            "artist":"${movie.artist}"
            }`);
        dropDownMovies.appendChild(el);
    }

async function getMoviesForDropDown() {
    data = await fetch(url + "/movies");
    movies = await data.json();
    movies.forEach(fillDropDownMovies);
}

getMoviesForDropDown();

dropDownTheaters.addEventListener("change", async function(){
    await newTheater(JSON.parse(dropDownTheaters.value));
})