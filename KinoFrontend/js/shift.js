const dropDownEmployees = document.querySelector(".drop-down-employees");
const dropDownShifts = document.querySelector(".drop-down-shifts");
const newShiftButton = document.querySelector(".new-shift-btn");
const dateInput = document.querySelector(".date-input");

let shifts = ["10:00 - 16:00", "14:00 - 22:00"];
let employees = ["Simon", "Kurt", "Jens", "Sasha", "Sara", "Josephine", "Niels", "Klara", "Mads", "Pernille"];

const url = `https://kinoxp.azurewebsites.net`;
//const url = `http://localhost:8080`;


async function newShift(data) {
    await fetch(url + "/shift", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}


newShiftButton.addEventListener('click', (e) => {
    e.preventDefault();
    const shift = JSON.parse(dropDownShifts.value);
    let selectedEmployeesTemp = "";

    for (const option of dropDownEmployees.options) {
        if (option.selected) {
            selectedEmployeesTemp += option.textContent + ", ";
        }
    }
    const selectedEmployees = selectedEmployeesTemp.substring(0,selectedEmployeesTemp.length - 2);

    let data = {
        date: dateInput.value,
        time: shift.time,
        employees: selectedEmployees
    }
    
    if(data){
        newShift(data);
        const formControl = document.querySelectorAll(".form-control");
        const formSelects = document.querySelectorAll(".form-select");

        for(let i = 0; i < formControl.length; i++){
            formControl[i].value = '';
        }
        for(let i = 0; i < formSelects.length; i++){
            formSelects[i].selectedIndex = 0;
        }

        console.log("Created")
        alert("Shift Created!")
    }
    
})

async function getEmployeesForDropDown() {
    employees.forEach(fillDropDownEmployees);
}

function fillDropDownEmployees(employee) {
    const el = document.createElement("option");
    el.textContent = employee;
    el.setAttribute("value", `{
        "name":"${employee.name}"
        }`);
    dropDownEmployees.appendChild(el);
}

async function getShiftsForDropDown() {
    shifts.forEach(fillDropDownShifts);
}

function fillDropDownShifts(shift) {
    const el = document.createElement("option");
    el.textContent = shift;
    el.setAttribute("value", `{
        "time":"${shift}"
        }`);
    dropDownShifts.appendChild(el);
}

getShiftsForDropDown();
getEmployeesForDropDown();