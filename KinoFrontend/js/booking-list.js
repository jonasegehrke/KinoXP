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
    row.insertCell(2).innerHTML = `Number of seats`;
    row.insertCell(3).innerHTML = `Show Id`;
    row.insertCell(4).innerHTML = `Show Title`;
    row.insertCell(5).innerHTML = `Show Date`;
    row.insertCell(6).innerHTML = `Show Time`;
    row.insertCell(7).innerHTML = `Edit Booking`;
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
        console.log(booking)
        let rowCount = bookingResult.rows.length;
        let row = bookingResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = booking.bookingId;
        row.insertCell(1).innerHTML = booking.bookingNumber;
        row.insertCell(2).innerHTML = booking.numberOfSeats;
        row.insertCell(3).innerHTML = booking.show.showId;
        row.insertCell(4).innerHTML = booking.show.movie.title;
        row.insertCell(5).innerHTML = booking.show.date;
        row.insertCell(6).innerHTML = booking.show.time;
        row.insertCell(7).innerHTML = "INSERT EDIT BOOKING HERE"
        row.insertCell(8).innerHTML = `<a onclick="deleteRow(this)"> <button type="button" class="btn btn-secondary uil uil-trash-alt"></button></a>`;
    }
}

function deleteRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;
    deleteBooking(row.childNodes[0].firstChild.nodeValue);
    table.removeChild(row);
}

getBookings();
bookingTableHeadlines();