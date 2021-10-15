const bookBtn = document.querySelector(".book-btn");

async function getShow(){
    let getParams = new URLSearchParams(window.location.search);
    const id = getParams.get("showId");
    const resp = await fetch(url + "/show/inspect/" + id);
    const respData = await resp.json();

    return respData;
}

async function addShowToPage(){
    const respData = await getShow();

    console.log(respData)

    const movieTitle = document.querySelector(".movie-title");
    const movieGenre = document.querySelector(".movie-genre");
    const movieArtist = document.querySelector(".movie-artist");
    const movieDuration = document.querySelector(".movie-duration");
    const movieAge = document.querySelector(".movie-age");

    const showDate = document.querySelector(".show-date");
    const showTime = document.querySelector(".show-time");
    const showId = document.querySelector(".show-id");

    const theaterName = document.querySelector(".theater-name");
    const theaterAvailableSeats = document.querySelector(".theater-available-seats");
    const theaterId = document.querySelector(".theater-id");

    //Set values
    movieTitle.innerHTML = respData.movie.title;
    movieGenre.innerHTML = respData.movie.genre;
    movieArtist.innerHTML = respData.movie.artist;
    movieDuration.innerHTML = respData.movie.movieDuration;
    movieAge.innerHTML = respData.movie.ageLimit;
    

    showDate.innerHTML = respData.date;
    showTime.innerHTML = respData.time;
    showId.innerHTML = respData.showId;

    theaterName.innerHTML = respData.theater.name;
    theaterAvailableSeats.innerHTML = respData.theater.availableSeats;
    theaterId.innerHTML = respData.theater.theaterId;

}

bookBtn.addEventListener('click', async (e) =>{
    e.preventDefault();

    const seatsInput = document.querySelector(".seats-input");
    const theaterAvailableSeats = document.querySelector(".theater-available-seats");
    const theaterName = document.querySelector(".theater-name");
    const theaterId = document.querySelector(".theater-id");

    
    const newAvailableSeats = theaterAvailableSeats.innerHTML - seatsInput.value;

    let big = null;

    if(theaterName.innerHTML == "Sal 1"){
        big = true;
    }else{
        big = false;
    }

    let newTheater = {
        availableSeats: newAvailableSeats,
        big: big,
        name: theaterName.innerHTML,
        theaterId: parseInt(theaterId.innerHTML)
    }

    const bookingNumber = Math.random().toString(36).substring(2,12);
    console.log(bookingNumber);
    const show = await getShow();

    const booking = {
        bookingNumber: bookingNumber,
        numberOfSeats: seatsInput.value,
        show: show
    }

    console.log(booking);
    newBooking(booking);
    updateTheater(newTheater);

})

async function updateTheater(data) {
    await fetch(url + "/theater/update", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    
    addShowToPage();
}

async function newBooking(data) {
    await fetch(url + "/booking", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}


addShowToPage();