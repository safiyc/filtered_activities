//create global variables
var labels = ["groceries", "errands", "house", "work"];
var localStorageTasks = [];

//get local storage
localStorageTasks = localStorage.getItem("tasks");
//console.log(localStorageTasks);

//on page load if local storage is not empty run code
if (localStorageTasks !== null) {
  //console.log('localStorage is not empty');
  localStorageTasks = JSON.parse(localStorageTasks);
  //console.log(localStorageTasks);
}

//function to display tasks on page which takes array param
var displayTasks = function(arr) {
  // console.log("displayTasks function");
  // console.log(arr);

  //destroy everything inside of #tasks-container
  document.getElementById('tasks-container').innerText = "";

  arr.forEach(function(val, i) {
    //console.log(val);

    //create elements
    var p = document.createElement('p');
    var task = document.createElement('span');
    var label = document.createElement('span');
    // console.log(p, task, label);
    //p = p.append(task);
    // console.log(task);

    task.textContent = val.t;
    label.textContent = val.l;

    //create node
    var elem = document.createTextNode(val.t + ' - ' + val.l);
    // console.log(typeof elem);
    p.appendChild(elem);
    //console.log(p);

    //append onto page
    document.getElementById("tasks-container").append(p);
  });
}

//function to add task to locol storage then display on page
var addTask = function(e) {
  //console.log('addThis function');

  //hide error message if already being displayed
  document.getElementById('error-message-label').style.display = "none";
  document.getElementById('error-message-task').style.display = "none";
  // console.log(this.parentNode.children);

  //get input and select values
  var parent = this.parentNode.children;
  var task = parent[0].value;
  var label = parent[1].value;

  //console.log(task, label);

  //check if input is blank or select has no value then display error message otherwise add to local storage and dislay on page
  if (task == "") {
    // console.log('need to select a label');
    //display error message for task
    document.getElementById('error-message-task').style.display = "block";
    parent[0].focus();
  } else if (label == "please select a label*") {
    // console.log('need to select a label');
    //display error message for select
    document.getElementById('error-message-label').style.display = "block";
  } else {
    //create obj to push
    var obj = {
      t: task,
      l: label
    };
    //console.log(obj);

    //push to local storage
    localStorageTasks.push(obj);

    //create variable to change local storage obj to string
    var json = JSON.stringify(localStorageTasks);
    //console.log(json);

    //set local storage
    localStorage.setItem("tasks", json);

    //display updated local storage
    displayTasks(localStorageTasks);
  }
}

//on page load add the <option> to the <select> from the label array
labels.forEach(function(val, i) {
  var elem = document.createElement("option");
  elem.value = val;
  elem.innerText = val;
  //console.log(elem);
  document.getElementById("tasks").children[1].append(elem);
});

//add click event listener
document.getElementById("tasks").children[2].addEventListener('click', addTask);

//on page load display the local storage
displayTasks(localStorageTasks);