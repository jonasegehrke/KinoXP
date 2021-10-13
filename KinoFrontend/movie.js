const movieResult = document.querySelector(".movie-result");
const titleInput = document.querySelector(".title-input");
const artistInput = document.querySelector(".artist-input");
const genreInput = document.querySelector(".genre-input");
const ageLimitInput = document.querySelector(".age-limit-input");
const durationInput = document.querySelector(".duration-input");
const newMovieBtn = document.querySelector(".new-movie-btn");


const movieUrl = `http://localhost:8080`;

async function getMovies() {
    const resp = await fetch(movieUrl + "/movies");
    const respData = await resp.json();
    addRow(respData);
}

async function deleteMovie(id) {
    await fetch(movieUrl + "/movie/" + id, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}

async function newMovie(data) {
    await fetch(movieUrl + "/movie", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}


function movieTableHeadlines() {
    let rowCount = movieResult.rows.length;
    let row = movieResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `Id`;
    row.insertCell(1).innerHTML = `Title`;
    row.insertCell(2).innerHTML = `Artist`;
    row.insertCell(3).innerHTML = `Genre`;
    row.insertCell(4).innerHTML = `Age limit`;
    row.insertCell(5).innerHTML = `Movie duration`;
    row.insertCell(6).innerHTML = 'Delete <i class="uil uil-trash-alt"></i>';

    row.setAttribute("id", "table-headline");
}


function addRow(respData) {
    for (let i = 0; i < respData.length; i++)
    {
        let movie = {
            id: respData[i].id,
            title: respData[i].title,
            artist: respData[i].artist,
            genre: respData[i].genre,
            ageLimit: respData[i].ageLimit,
            movieDuration: respData[i].movieDuration
        }
        let rowCount = movieResult.rows.length;
        let row = movieResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = movie.id;
        row.insertCell(1).innerHTML = movie.title;
        row.insertCell(2).innerHTML = movie.artist;
        row.insertCell(3).innerHTML = movie.genre;
        row.insertCell(4).innerHTML = movie.ageLimit;
        row.insertCell(5).innerHTML = movie.movieDuration;
        row.insertCell(6).innerHTML = `<a onclick="deleteRow(this)"> <button class="delete-movie-btn uil uil-trash-alt"></button></a>`;
    }
}

function deleteRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;
    deleteMovie(row.childNodes[0].firstChild.nodeValue);
    table.removeChild(row);
}

if(newMovieBtn){
newMovieBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let data = {
        title: titleInput.value,
        genre: genreInput.value,
        artist: artistInput.value,
        ageLimit: ageLimitInput.value,
        movieDuration: durationInput.value
    }
    if (data){
        console.log(data + " sent to REST")
        newMovie(data)
    }
})
}
