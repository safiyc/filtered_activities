const labels = ['outdoor', 'indoor', 'money', 'solo'];
// approach #1
const tasks = [];  // {desc, labels}

// appraoch 2: localstorage list all items
for (let i = 0; i < localStorage.length; i++) {
  const itemDesc = JSON.parse(localStorage.getItem(localStorage.key(i))).desc;

  // console.log('itemDesc: ', itemDesc.desc);

  const list = document.getElementById('list');
  const li = document.createElement('li');

  li.innerHTML = itemDesc;
  li.setAttribute('onclick', 'openItemModal(this)');
  li.setAttribute('class', 'list-item');

  list.appendChild(li);
}

// modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const closeModalSpan = document.getElementById('closeModal');

const inputItem = document.getElementById('inputItem');
let addedInput;

function addItem() {
  addedInput = inputItem.value;

  if (!localStorage.getItem(addedInput)) {
    const list = document.getElementById('list');
    const li = document.createElement('li');

    li.innerHTML = addedInput;
    li.setAttribute('onclick', 'openItemModal(this)');
    li.setAttribute('class', 'list-item');

    list.appendChild(li);

    const taskObj = {
      desc: addedInput,
      labels: labels
    }

    // approach #1: save as object
    tasks.push(taskObj);
    console.log('all tasks: ', tasks);

    // approach #2: save in localstorage
    localStorage.setItem(addedInput, JSON.stringify(taskObj));
    console.log('localStorage: ', localStorage);
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
