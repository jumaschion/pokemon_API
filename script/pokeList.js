var input = document.getElementsByName('input-text')[0];
var add = document.getElementById('add');
var taskList = document.querySelector('.list-group')


// Adicionar Pokemon
function addTask(e) {
	console.log(e)
	if (!input.value) {
		input.placeholder = 'Add a new Pokemon';
	} else if (e.keyCode == 13 || e.type == "click") {
		var li = document.createElement('li');
		li.className = 'list-group-item';
		li.innerHTML = input.value + '<span class="fas fa-trash removeTask"></span>';
		taskList.prepend(li);

		save(input.value);
		input.value = '';
	}
}

// Remover Pokemon
function remove(e) {
	var target = e.target;

	if (target.classList.contains('removeTask')) {
		taskList.removeChild(target.parentNode);
		var task = target.previousSibling.data;
		removeStoreTask(task);
	}
}


input.addEventListener('keydown', addTask, false);
add.addEventListener('click', addTask, false);
taskList.addEventListener('click', remove, false);

loadTaskList();


//Local Storage

function save(item) {
	var taskListArray = getStoreArray("taskList");
	taskListArray.push(item);
	localStorage.setItem("taskList", JSON.stringify(taskListArray));
}

function loadTaskList() {
	var taskListArray = getSavedTasks();
	if (taskListArray != null) {
		for (var i = 0; i < taskListArray.length; i++) {
			var li = document.createElement('li');
			li.className = 'list-group-item';
			li.innerHTML = taskListArray[i] + '<span class="fas fa-trash removeTask"></span>';
			taskList.prepend(li);
		}
	}
}

function getSavedTasks() {
	return getStoreArray("taskList");
}

function getStoreArray(key) {
	var taskListArray = localStorage.getItem(key);
	if (taskListArray == null || taskListArray == "") {
		taskListArray = new Array();
	}
	else {
		taskListArray = JSON.parse(taskListArray);
	}
	return taskListArray;
}

function removeStoreTask(task) {
	var taskListArray = getStoreArray("taskList");
	for (var i = 0; i < taskListArray.length; i++) {
		if (taskListArray[i] == task) {
			taskListArray.splice(i, 1);
		}
		localStorage.setItem("taskList", JSON.stringify(taskListArray));
	}
} 

