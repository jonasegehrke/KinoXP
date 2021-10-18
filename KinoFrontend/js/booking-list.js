const bookingResult = document.querySelector(".booking-result");


//const url = `https://kinoxp.azurewebsites.net`;
const url = `http://localhost:8080`;

async function getBookings() {
    const resp = await fetch(url + "/bookings");
    const respData = await resp.json();
    addRow(respData);
}

async function deleteBooking(id) {
    await fetch(url + "/booking/" + id, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

function bookingTableHeadlines() {
    let rowCount = bookingResult.rows.length;
    let row = bookingResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `Booking Id`;
    row.insertCell(1).innerHTML = `Booking Number`;
    row.insertCell(2).innerHTML = `Number of seats (Editable)`;
    row.insertCell(3).innerHTML = `Show Id`;
    row.insertCell(4).innerHTML = `Show Title`;
    row.insertCell(5).innerHTML = `Show Date`;
    row.insertCell(6).innerHTML = `Show Time`;
    row.insertCell(7).innerHTML = `Save Edit`;
    row.insertCell(8).innerHTML = 'Delete <i class="uil uil-trash-alt"></i>';

    row.setAttribute("id", "table-headline");
}

function addRow(respData) {
    for (let i = 0; i < respData.length; i++) {
        let booking = {
            bookingId: respData[i].bookingId,
            bookingNumber: respData[i].bookingNumber,
            numberOfSeats: respData[i].numberOfSeats,
            show: respData[i].show,
            showId: respData[i].show.showId,
            showTitle: respData[i].show.movie.title,
            showDate: respData[i].show.date,
            showTime: respData[i].show.time

        }
        
        let rowCount = bookingResult.rows.length;
        let row = bookingResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = booking.bookingId;
        row.insertCell(1).innerHTML = booking.bookingNumber;
        row.insertCell(2).innerHTML = `<p contentEditable="true">${booking.numberOfSeats}</p>`;
        row.insertCell(3).innerHTML = booking.show.showId;
        row.insertCell(4).innerHTML = booking.show.movie.title;
        row.insertCell(5).innerHTML = booking.show.date;
        row.insertCell(6).innerHTML = booking.show.time;
        row.insertCell(7).innerHTML = `<a onclick="saveRow(this)"><button type="button" class="btn btn-secondary uil uil-save"></button></a>`
        row.insertCell(8).innerHTML = `<a onclick="deleteRow(this)"> <button type="button" class="btn btn-secondary uil uil-trash-alt"></button></a>`;
    }
}

function deleteRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;

    const numberOfSeats = row.childNodes[2].firstChild.textContent;
    const showId = row.childNodes[3].firstChild.nodeValue;
    removeSeatsFromTheater(showId, numberOfSeats);

    deleteBooking(row.childNodes[0].firstChild.nodeValue);
    table.removeChild(row);
}

function saveRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;

    const numberOfSeats = row.childNodes[2].firstChild.textContent;
    const showId = row.childNodes[3].firstChild.nodeValue;
    const bookingId = row.childNodes[0].firstChild.nodeValue;
    //removeSeatsFromTheater(showId, numberOfSeats);
 
    updateSeatsFromTheater(bookingId, numberOfSeats);
    //deleteBooking(row.childNodes[0].firstChild.nodeValue);
    //table.removeChild(row);
}

async function updateSeatsFromTheater(bookingId, numberOfSeats){
    const resp = await fetch(url + "/booking/inspect/" + bookingId);
    const respData = await resp.json();

   
    let oldSeats = respData.numberOfSeats;
    let availableSeats = respData.show.theater.availableSeats;
    
    if(numberOfSeats > oldSeats){
        availableSeats = availableSeats - (numberOfSeats - oldSeats)
    }else if(numberOfSeats < oldSeats){
        availableSeats = availableSeats + (oldSeats - numberOfSeats)
    }

    let theater = {
        theaterId: respData.show.theater.theaterId,
        name: respData.show.theater.name,
        big: respData.show.theater.big,
        availableSeats: availableSeats
    }

    let booking = {
        bookingId: respData.bookingId,
        bookingNumber: respData.bookingNumber,
        numberOfSeats: numberOfSeats,
        show: respData.show
    }

    await fetch(url + "/booking/update", {
        method: "PUT",
        body: JSON.stringify(booking),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    await fetch(url + "/theater/update", {
        method: "PUT",
        body: JSON.stringify(theater),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })


}

async function removeSeatsFromTheater(showId, numberOfSeats){
    const resp = await fetch(url + "/show/inspect/" + showId);
    const respData = await resp.json();



    let availableSeats = parseInt(respData.theater.availableSeats);
    numberOfSeats = parseInt(numberOfSeats);
    availableSeats = availableSeats + numberOfSeats;

    let theater = {
        theaterId: respData.theater.theaterId,
        name: respData.theater.name,
        big: respData.theater.big,
        availableSeats: availableSeats
    }

    await fetch(url + "/theater/update", {
        method: "PUT",
        body: JSON.stringify(theater),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

getBookings();
bookingTableHeadlines();