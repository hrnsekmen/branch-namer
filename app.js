const input = document.getElementById("input");
const form = document.getElementById("form");
const result_div = document.getElementById("result");
const select_option = document.getElementById("select");
const date_checkbox = document.getElementById("date_checkbox");
const empty = document.getElementById("empty");
const result_container = document.getElementById("result-container");
const date_bg = document.getElementById("bg");
const i_submit = document.getElementById("submit");
const date_container = document.querySelector(".date");
const remove_list = document.getElementById("remove-btn");
const wrapper_1 = document.querySelector(".wrapper-1");

function events() {
  date_container.addEventListener("click", isDateChecked);
  document.addEventListener("DOMContentLoaded", loadUI);
  i_submit.addEventListener("click", Converter);
  result_div.addEventListener("click", resultControl);
  form.addEventListener("submit", Converter);
  remove_list.addEventListener("click", removeList);
  remove_list.addEventListener("mouseenter", blurOn);
  remove_list.addEventListener("mouseleave", blurOff);
}
events();
function loadUI() {
  showStoreData();
  storeCheck();
}
function Converter(e) {
  var date = new Date().toLocaleDateString().split(".").join("");
  var x = "";
  for (const harf of input.value) {
    x += harf
      .split("ı")
      .join("i")
      .split("İ")
      .join("I")
      .toLowerCase()
      .replace("ğ", "g")
      .replace("ç", "c")
      .replace("ü", "u")
      .replace("ö", "o")
      .replace("ş", "s")
      .replace(/\s+/g, select_option.value);
  }

  x = date_checkbox.checked ? date + "-" + x : x;

  if (x === "" || x === null) {
    showAlert("Empty Area!", true);
  } else {
    displayData(x);
  }

  e.preventDefault();
}

function showAlert(msg, err) {
  let old_div = document.querySelector(".alert");
  if (old_div) {
    old_div.parentNode.removeChild(old_div);
  }
  let div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = msg;
  document.body.appendChild(div);

  setTimeout(() => {
    err ? div.classList.add("error") : div.classList.add("active");
  }, 1);

  setTimeout(() => {
    div.classList.remove("active");
    div.classList.remove("error");
  }, 1000);
}
function copyCustom(htmlElement) {
  if (!htmlElement) {
    console.error("not valid!");
    return;
  }
  let elementText = htmlElement.innerText;
  let inputElement = document.createElement("input");
  inputElement.setAttribute("value", elementText);
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand("copy");
  inputElement.parentNode.removeChild(inputElement);
  console.log(elementText);
  showAlert(`"${elementText}" copied!`, false);
}
function resultControl(e) {
  result_div.innerHTML === "" ? null : copyCustom(e.target);
}
function isDateChecked(e) {
  console.log(e);
  if (date_checkbox.checked) {
    date_checkbox.parentElement.classList.add("active-check");
    date_checkbox.previousElementSibling.classList.add("active-check");
  } else {
    date_checkbox.parentElement.classList.remove("active-check");
    date_checkbox.previousElementSibling.classList.remove("active-check");
  }
}

function storeCheck() {
  const store = getStorageList();
  if (store.length === 0) {
    empty.classList.remove("d-none");
    remove_list.classList.add("d-none");
  } else {
    empty.classList.add("d-none");
    remove_list.classList.remove("d-none");
  }
}

function getStorageList() {
  let list = [];
  if (sessionStorage.getItem("user-list") === null) {
    console.log("storage boş!");
    sessionStorage.setItem("user-list", JSON.stringify(list));
  }
  return JSON.parse(sessionStorage.getItem("user-list"));
}

const addListItemToStorage = (item) => {
  const store = getStorageList();
  store.push(item);
  sessionStorage.setItem("user-list", JSON.stringify(store));
  storeCheck();
};

const showStoreData = () => {
  const store = getStorageList();
  store.map((listItem) => {
    const li = document.createElement("li");
    li.innerText = listItem;
    result_div.appendChild(li);
  });
};

const addListItemToUI = (item) => {
  const li = document.createElement("li");
  li.innerText = item;
  result_div.appendChild(li);
};

function displayData(data) {
  addListItemToUI(data);
  addListItemToStorage(data);
  input.value = "";
}

function removeList() {
  if (confirm("Are you sure?")) {
    sessionStorage.removeItem("user-list");
    showStoreData();
    storeCheck();
    result_div.innerHTML = "";
    input.value = "";
  }
}

function blurOn() {
  result_div.classList.add("blur");
  wrapper_1.classList.add("blur");
}
function blurOff() {
  result_div.classList.remove("blur");
  wrapper_1.classList.remove("blur");
}
