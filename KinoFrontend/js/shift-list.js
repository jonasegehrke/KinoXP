const shiftResult = document.querySelector(".shift-result");

//const url = `https://kinoxp.azurewebsites.net`;
const url = `http://localhost:8080`;


async function getShifts() {
    const resp = await fetch(url + "/shifts");
    const respData = await resp.json();
    addRow(respData);
}

function addRow(respData) {
    for (let i = 0; i < respData.length; i++) {
        let shift = {
            shiftId: respData[i].shiftId,
            date: respData[i].date,
            time: respData[i].time,
            employees: respData[i].employees
        }
        let rowCount = shiftResult.rows.length;
        let row = shiftResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = shift.shiftId;
        row.insertCell(1).innerHTML = shift.date;
        row.insertCell(2).innerHTML = shift.time;
        row.insertCell(3).innerHTML = shift.employees;
    }
}

function shiftTableHeadlines() {
    let rowCount = shiftResult.rows.length;
    let row = shiftResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `ShiftId`;
    row.insertCell(1).innerHTML = `Date`;
    row.insertCell(2).innerHTML = `Time`;
    row.insertCell(3).innerHTML = `Employees`;
}


shiftTableHeadlines();
getShifts();