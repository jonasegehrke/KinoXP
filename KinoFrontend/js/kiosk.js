const kioskResult = document.querySelector(".kiosk-result");
const newItemBtn = document.querySelector(".new-item-btn");
const nameInput = document.querySelector(".name-input");
const priceInput = document.querySelector(".price-input");
const amountInput = document.querySelector(".amount-input");
const inputFields = document.querySelectorAll(".form-control");
const totalLabel = document.querySelector(".total-label");
const recieptList = document.querySelector(".reciept-list");
console.log("hello World");

//const url = `https://kinoxp.azurewebsites.net`;
const url = `http://localhost:8080`;

async function getKioskItems() {
    const resp = await fetch(url + "/kiosk-items");
    const respData = await resp.json();
    addRow(respData);
}

async function deleteKioskItem(id) {
    await fetch(url + "/kiosk-item/" + id, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

async function newKioskItem(data) {
    await fetch(url + "/kiosk-item", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });
}



function kioskTableHeadlines() {
    let rowCount = kioskResult.rows.length;
    let row = kioskResult.insertRow(rowCount);

    row.insertCell(0).innerHTML = `Item id`;
    row.insertCell(1).innerHTML = `Name (Editable)`;
    row.insertCell(2).innerHTML = `Price in DKK (Editable)`;
    row.insertCell(3).innerHTML = `Amount`;
    
    row.insertCell(4).innerHTML = `Save Edit`;
    row.insertCell(5).innerHTML = 'Delete <i class="uil uil-trash-alt"></i>';

    row.setAttribute("id", "table-headline");
}

function addRow(respData) {
    for (let i = 0; i < respData.length; i++) {
        let kioskItem = {
            kioskItemId: respData[i].kioskItemId,
            name: respData[i].name,
            price: respData[i].price
             }
        
        let rowCount = kioskResult.rows.length;
        let row = kioskResult.insertRow(rowCount);

        row.insertCell(0).innerHTML = kioskItem.kioskItemId
        row.insertCell(1).innerHTML = `<p contentEditable="true" class="item-name">${kioskItem.name}</p>`;
        row.insertCell(2).innerHTML = `<p contentEditable="true" class="item-price">${kioskItem.price}</p>`;
        row.insertCell(3).innerHTML = `<p contentEditable="true" class="amount-input"></p>`;
        
        row.insertCell(4).innerHTML = `<a onclick="saveRow(this)"><button type="button" class="btn btn-secondary uil uil-save"></button></a>`
        row.insertCell(5).innerHTML = `<a onclick="deleteRow(this)"> <button type="button" class="btn btn-secondary uil uil-trash-alt"></button></a>`;
    }
}

newItemBtn.addEventListener('click', async(event) => {
    event.preventDefault();
    
    let data = {
        name: nameInput.value,
        price: priceInput.value
    }
    console.log("hello");
    if (data){
        await newKioskItem(data);

        kioskResult.innerHTML = '';
        kioskTableHeadlines();
        
        for(let i = 0; i < inputFields.length; i++){
            inputFields[i].value = '';
        }

        getKioskItems();

    }
    
});

function calculate(){
    const names = document.querySelectorAll(".item-name");
    const amounts = document.querySelectorAll(".amount-input");
    const prices = document.querySelectorAll(".item-price");
    let item = document.createElement('li');

    let total = 0;
    let cart = [];
    for (let i = 0; i<amounts.length; i++){
        let currentAmount = parseInt(amounts[i].textContent);
        let currentPrice = parseInt(prices[i].textContent);
        if (Number.isNaN(currentAmount) == false){
            total = total + (currentAmount * currentPrice);
            let item = {
                name :names[i].textContent,
                amount: currentAmount,
                price: currentAmount * currentPrice
            }
            cart.push(item);
        }
        
    }
     while(recieptList.firstChild ){
           recieptList.removeChild(recieptList.firstChild ); 
        }

    for (let i = 0; i<cart.length; i++){
        item = document.createElement('li');
        item.innerHTML = `${cart[i].amount} x ${cart[i].name} = ${cart[i].price} kr`
        recieptList.appendChild(item);
    }

    console.log(cart);

    totalLabel.innerHTML = total + " kr";

}

function deleteRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;
    deleteKioskItem(row.childNodes[0].firstChild.nodeValue);
    table.removeChild(row);
}

async function saveRow(rowObj) {
    let row = rowObj.parentNode.parentNode;
    let table = row.parentNode;

    const name = row.childNodes[1].firstChild.textContent;
    const priceTemp = row.childNodes[2].firstChild.textContent;
    const price = parseInt(priceTemp);
    const id = row.childNodes[0].firstChild.nodeValue;
    let kioskItem ={
        kioskItemId: id,
        name: name,
        price: price
    }
    console.log(kioskItem);
    await fetch(url + "/kiosk-item/update",{
        method: "PUT",
        body: JSON.stringify(kioskItem),
        headers: { "Content-type": "application/json; charset=UTF-8"}
    });
    
} 

kioskTableHeadlines();
getKioskItems();
