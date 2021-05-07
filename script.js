const labels = ['outdoor', 'indoor', 'money', 'solo'];
const tasks = [];

// modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const inputItem = document.getElementById('inputItem');
let addedInput;

function addItem() {
  addedInput = inputItem.value;

  const list = document.getElementById('list');
  const li = document.createElement('li');

  li.innerHTML = addedInput;
  li.setAttribute('onclick', 'linkLabels(this)');
  li.setAttribute('class', 'list-item');

  list.appendChild(li);

  const taskObj = {
    desc: addedInput,
    labels: labels
  }

  tasks.push(taskObj);
  console.log(tasks);
}

function linkLabels(that) {

  console.log('item: ', that);
  // When the user clicks the item, open the modal 
  // that.onclick = function () {
  //   modal.style.display = "block";
  // }

  // that.addEventListener('click', function (e) {
  //   modal.style.display = "block";
  // });

}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
