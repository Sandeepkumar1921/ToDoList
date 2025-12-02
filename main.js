let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const name = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("taskDate").value;
    const time = document.getElementById("taskTime").value || "00:01";
    const priority = document.getElementById("taskPriority").value;
    
    if (!name || !date) return alert("Task name and date required!");
    
    const task = {
        id: Date.now(),
        text: name,
        date: date,
        time: time,
        priority: priority,
        completed: false
    };
    
    tasks.push(task);
    saveTasks();
    scheduleNotification(task); // ← Notification setup
    
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
    
    displayTasks();
}

function deleteTask(i) {
    if (confirm("Delete this task?")) {
        tasks.splice(i, 1);
        saveTasks();
        displayTasks();
    }
}

function editTask(i) {
    const t = prompt("Edit task name:", tasks[i].text);
    if (t) {
        tasks[i].text = t;
        saveTasks();
        displayTasks();
    }
}

function toggleComplete(i) {
    tasks[i].completed = !tasks[i].completed;
    saveTasks();
    displayTasks();
}

function displayTasks() {
    const todayObj = new Date();
    const todayStr = todayObj.toISOString().split('T')[0];
    
    const todayTasks = document.getElementById("todayTasks");
    const notCompleted = document.getElementById("notCompletedTasks");
    const completed = document.getElementById("completedTasks");
    
    todayTasks.innerHTML = "";
    notCompleted.innerHTML = "";
    completed.innerHTML = "";
    
    tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ⚑ ${task.text}
            <br>
            <small>${task.date} • ${task.time}</small>
        `;
        
        const btnDiv = document.createElement("div");
        btnDiv.className = "buttons";
        
        const c = document.createElement("button");
        c.textContent = "✔";
        c.className = "complete-btn";
        c.onclick = () => toggleComplete(i);
        
        const e = document.createElement("button");
        e.textContent = "✎";
        e.className = "edit-btn";
        e.onclick = () => editTask(i);
        
        const d = document.createElement("button");
        d.textContent = "🗑";
        d.className = "delete-btn";
        d.onclick = () => deleteTask(i);
        
        btnDiv.append(c, e, d);
        li.append(btnDiv);
        
        if (task.completed && task.date === todayStr) {
            li.className = "completed";
            completed.appendChild(li);
        } else if (task.date === todayStr) {
            li.className = "pending";
            todayTasks.appendChild(li);
        } else if (task.date < todayStr && !task.completed) {
            li.className = "not-completed";
            notCompleted.appendChild(li);
        }
    });
}

displayTasks();