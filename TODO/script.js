let ValueStore = [];
let ValueFromUser = document.querySelector("#value");
let result = document.querySelector(`#searchresult`);


function saveDataToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}


function getDataFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function del(index) {
  ValueStore.splice(index, 1);
  saveDataToLocalStorage("ValueStore", JSON.stringify(ValueStore));
  inputvalue(); 
}

function inputvalue() {
  let Value = document.querySelector("#value").value;
  
  if (Value !== ``) {
    ValueStore.push(Value);
    saveDataToLocalStorage("ValueStore", JSON.stringify(ValueStore));
    location.reload(); 
  }

  ValueFromUser.value = ``;
  let output = document.querySelector(`#output`);
  output.innerHTML = ``;

  for (let i = 0; i < ValueStore.length; i++) {
    output.innerHTML +=
      `<div id= output1><p id="paragraph">${ValueStore[i]}</p><button onclick="del(${i});" id="delete-button" >delete</button></div>`;
  }

  result.innerText = ``;
}

function search() {
  
  let temp = 0;
  let searchvalue = document.querySelector("#value");
  let search = searchvalue.value;

  for (let i = 0; i < ValueStore.length; i++) {
    if (search == ValueStore[i]) {
      result.innerText = `${ValueStore[i] + "  " + "founded successfully"}`;
      temp = 1;
    }
  }
  if (temp === 0) {
    result.innerText = `not found`;
    temp = 1;
  }

  searchvalue.value = ``;
}

let button = 1;
const background = () => {
  let header = document.querySelector(`#header`);
  let backgroundcolor = document.querySelector(`body`);
  let textcolor = document.querySelector(`#output`);

  let color = backgroundcolor;
  if (button == 1) {
    color.style.backgroundColor = "black";
    textcolor.style.color = "white";
    button = 0;
    header.style.color = "blue";
    console.log(button);
    result.style.color = "white";
  } else if (button == 0) {
    button = 1;
    color.style.backgroundColor = "white";
    textcolor.style.color = "black";
    header.style.color = "red";
    result.style.color = "black";
  }
};


function loadAndDisplayData() {
  const storedValue = getDataFromLocalStorage("ValueStore");
  if (storedValue) {
    ValueStore = JSON.parse(storedValue);
    inputvalue();
  }
}


loadAndDisplayData();
