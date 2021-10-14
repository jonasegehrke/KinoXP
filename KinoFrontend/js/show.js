const dateInput = document.querySelector(".date-input");
const timeInput = document.querySelector(".time-input");
const theaterInput = document.querySelector(".theater-input");
const dropDownMovies = document.querySelector(".drop-down-movies");
const newShowBtn = document.querySelector(".new-show-btn");
const showResult = document.querySelector(".show-result");

//const url = `https://kinoxp.azurewebsites.net`;
const url = `http://localhost:8080`;

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

function showTableHeadlines() {
    let rowCount = showResult.rows.length;
    let row = showResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `showId`;
    row.insertCell(1).innerHTML = `date`;
    row.insertCell(2).innerHTML = `time`;
    row.insertCell(3).innerHTML = `theater`;
    row.insertCell(4).innerHTML = `movie`;
    row.insertCell(5).innerHTML = 'Delete <i class="uil uil-trash-alt"></i>';
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
        row.insertCell(3).innerHTML = show.theater;
        row.insertCell(4).innerHTML = show.movie;
        row.insertCell(5).innerHTML = `<a onclick="deleteRow(this)"> <button class="delete-show-btn uil uil-trash-alt"></button></a>`;
    }
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
        let data = {
            date: dateInput.value,
            time: timeInput.value,
            theater: theaterInput.value,
            movie: dropDownMovies.value
        }
        console.log(data);
        if (data) {
            console.log(data + " sent to REST")
            newShow(data)
        }
    })
}

async function fillDropDownMovies(movie) {
        const el = document.createElement("option");
        el.textContent = movie.title;
        el.setAttribute("value", `{
            "id":${movie.id}, 
            "title":${movie.title},
            "genre":${movie.genre},
            "ageLimit":${movie.ageLimit},
            "movieDuration":${movie.movieDuration},
            "artist":${movie.artist}
        }`);
        dropDownMovies.appendChild(el);
    }


async function getMoviesForDropDown() {
    data = await fetch(url + "/movies");
    movies = await data.json();
    movies.forEach(fillDropDownMovies);
}

getMoviesForDropDown();

dropDownMovies.addEventListener('change', function (){
    let value = JSON.parse(JSON.stringify(dropDownMovies.value));
    console.log(value.id);
})