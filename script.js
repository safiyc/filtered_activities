// data structure
// localStorage = {desc, labels}
// revision to make localStorage = {labels: [], items: [{desc: str, labels: []}] }

console.log('local storage at page load: ', localStorage);

// create labels
const labels = ['outdoor', 'indoor', 'money', 'solo'];
// set labels as array to localStorage
// localStorage.setItem('labels', JSON.stringify(labels));
// console.log('labels localstorage', localStorage.labels);

// items from localStorage
// let itemsFromStorage = [];
let sortedItemsFromStorage = [];

function sortItems() {

  let itemsFromStorage = [];
  sortedItemsFromStorage = [];

  console.log('localStorage items as array: ', itemsFromStorage);

  // localstorage to array
  for (let i = 0; i < localStorage.length; i++) {
    const item = JSON.parse(localStorage.getItem(localStorage.key(i)));

    itemsFromStorage.push(item);
  }

  // descending sort
  sortedItemsFromStorage = itemsFromStorage.sort((a, b) => (a.desc > b.desc ? 1 : -1));

  console.log('localStorage as sorted array: ', sortedItemsFromStorage);
}

// render all items as li
function renderList() {
  const list = document.getElementById('list');
  // remove all li elements
  while (list.firstChild) {
    list.firstChild.remove();
    console.log('firstchild removed: ', list.firstChild);
  }

  for (let i = 0; i < sortedItemsFromStorage.length; i++) {
    // const itemDesc = JSON.parse(localStorage.getItem(localStorage.key(i))).desc;

    const itemDesc = sortedItemsFromStorage[i].desc;

    // console.log('itemDesc: ', itemDesc);

    const list = document.getElementById('list');
    const li = document.createElement('li');

    li.innerHTML = itemDesc;
    li.setAttribute('onclick', 'openItemModal(this)');
    li.setAttribute('class', 'list-item');

    list.appendChild(li);

    console.log('item to render: ', li);
  }
}

function sortAndRender() {
  sortItems();
  renderList();
}


// add item to array, then localstorage
function addItem() {
  const inputItem = document.getElementById('inputItem').value;
  // const addedInput = inputItem.value;
  console.log('localStorage getItem ', localStorage.getItem(inputItem));
  // console.log('localStorage getItem ', localStorage.getItem('items'));

  if (!localStorage.getItem(inputItem)) {
    // const list = document.getElementById('list');
    // const li = document.createElement('li');

    // li.innerHTML = addedInput;
    // li.setAttribute('onclick', 'openItemModal(this)');
    // li.setAttribute('class', 'list-item');

    // list.appendChild(li);

    // remove all li elements
    // while (list.firstChild) {
    //   list.firstChild.remove();
    //   console.log('firstchild removed: ', list.firstChild);
    // }

    const taskObj = {
      desc: inputItem,
      labels: labels
    }

    // save to localstorage
    localStorage.setItem(inputItem, JSON.stringify(taskObj));
    console.log('item added to localStorage: ', localStorage);

    // test: localstorage data structure
    // localStorage.setItem('items', JSON.stringify(taskObj));
    // console.log('item added to localStorage: ', localStorage);

    // sort data and create and render li
    sortAndRender();
  }
}

// modal
function openItemModal(that) {

  console.log('item clicked: ', that.textContent);

  const itemDesc = that.textContent;
  console.log('getItem: ', JSON.parse(localStorage.getItem(itemDesc)).desc);
  const parsedItemDesc = JSON.parse(localStorage.getItem(itemDesc)).desc;

  // When the user clicks the item, display the modal
  modal.style.display = "block";

  // ul containing labels on modal
  const itemLabelsList = document.getElementById('listItemLabels');
  const itemHeading = document.getElementById('itemHeading');
  itemHeading.textContent = parsedItemDesc;
}

// modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const closeModalSpan = document.getElementById('closeModal');

// When the user clicks on <span> (x), close the modal
closeModalSpan.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


Window.onload = sortAndRender();