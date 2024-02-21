showTask();
let addTaskInput = document.getElementById('addTaskInput');
let addTaskBtn = document.getElementById('addTaskBtn');

addTaskBtn.addEventListener("click", function(){
    addTaskInputVal = addTaskInput.value;
    if(addTaskInputVal.trim() != 0){
        let webTask = localStorage.getItem("localTask");
        if(webTask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webTask);
        }
        taskObj.push({'task_name':addTaskInputVal});
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        addTaskInput.value = '';
    }
    showTask();
})

function showTask(){
    let webTask = localStorage.getItem("localTask");
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    let html = '';
    let addedTaskList = document.getElementById('addedTaskList');
    taskObj.forEach((item, index) => {
        html += `<tr class = "itemList">
            <td scope = "row">${index}</td>
            <th width = "100%">${item.task_name}</th>
            <td>
                <button type = "button" onclick = "editTask(${index});" class = "blue">Изменить</button>
            </td>
            <td>
                <button type = "button" onclick = "deleteTask(${index});" class = "red">Удалить</button>
            </td>
        </tr>`;
    });
    addedTaskList.innerHTML = html;
}

function deleteTask(index){
    let webTask = localStorage.getItem("localTask");
    taskObj = JSON.parse(webTask);
    taskObj.splice(index,1);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
}

function editTask(index){
    let saveIndex = document.getElementById('saveIndex');
    let addTaskBtn = document.getElementById('addTaskBtn');
    let saveTaskBtn = document.getElementById('saveTaskBtn');
    saveIndex.value = index;
    let webTask = localStorage.getItem("localTask");
    taskObj = JSON.parse(webTask);
    addTaskInput.value = taskObj[index]['task_name'];
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

let saveTaskBtn = document.getElementById('saveTaskBtn');
saveTaskBtn.addEventListener("click", function(){
    let addTaskBtn = document.getElementById('addTaskBtn');
    let webTask = localStorage.getItem("localTask");
    taskObj = JSON.parse(webTask);
    let saveIndex = document.getElementById('saveIndex').value;
    for(keys in taskObj[saveIndex]){
        if(keys == 'task_name'){
            taskObj[saveIndex].task_name = addTaskInput.value;
        }
    }
    saveTaskBtn.style.display = "none";
    addTaskBtn.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addTaskInput.value = '';
    showTask();
})

let deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener("click", function(){
    let saveTaskBtn = document.getElementById('saveTaskBtn');
    let addTaskBtn = document.getElementById('addTaskBtn');
    let webTask = localStorage.getItem("localTask");
    taskObj = JSON.parse(webTask);
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    saveTaskBtn.style.display = "none";
    addTaskBtn.style.display = "block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
})

let searchTextBox = document.getElementById('searchTextBox');
searchTextBox.addEventListener("input", function(){
    let trList = document.querySelectorAll('tr');
    Array.from(trList).forEach(function(item){
        let searchedText = item.getElementsByTagName('th')[0].innerText;
        let searchedTextBoxVal = searchTextBox.value;
        let re = new RegExp(searchedTextBoxVal);
        if(searchedText.match(re)){
            item.style.display = "table-row";
        }
        else{
            item.style.display = "none";
        }
    })
})