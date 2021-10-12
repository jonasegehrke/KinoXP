const movieResult = document.querySelector(".movie-result");
const movieUrl = `http://localhost:8080/`;

async function getMovies() {
    const resp = await fetch(movieUrl);
    const respData = await resp.json();
    addRow(respData);
}

async function deleteMovie(id) {
    await fetch(movieUrl, {
        method: "DELETE",
        // body: JSON.stringify(id), skal måske slettes
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}

async function newMovie() {
    await fetch(movieUrl, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
}


function movieTableHeadlines() {
    let rowCount = movieResult.rows.length;
    let row = movieResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `Id`;
    row.insertCell(1).innerHTML = `Title`;
    row.insertCell(2).innerHTML = `Genre`;
    row.insertCell(3).innerHTML = `Age limit`;
    row.insertCell(4).innerHTML = `Movie duration`;
    row.insertCell(5).innerHTML = 'Delete <i class="uil uil-trash-alt"></i>';

    row.setAttribute("id", "table-headline");
}

movieTableHeadlines();

function addRow(respData) {
    for (let i = 0; i > respData.length; i++)
    {
        let movie = {
            id: respData[i].id,
            title: respData[i].title,
            genre: respData[i].genre,
            ageLimit: respData[i].ageLimit,
            movieDuration: respData[i].movieDuration
        }

        let rowCount = movieResult.rows.length;
        let row = movieResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = movie.id;
        row.insertCell(1).innerHTML = movie.title;
        row.insertCell(2).innerHTML = movie.genre;
        row.insertCell(3).innerHTML = movie.ageLimit;
        row.insertCell(4).innerHTML = movie.movieDuration;
        row.insertCell(5).innerHTML = `<a onclick="deleteRow(this)"> <button class="delete-movie-btn uil uil-trash-alt"></button></a>`;
    }
}

function deleteRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;
    deleteMovie(row.childNodes[0].nodeValue);
    table.removeChild(row);
}

