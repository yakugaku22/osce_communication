let data = {};
let currentTask = null;

document.addEventListener("DOMContentLoaded", async () => {
  data = await fetch("./data.json").then(res => res.json());

  const container = document.getElementById("task-container");

  Object.keys(data).forEach(task => {
    const btn = document.createElement("button");
    btn.className = "task-btn";
    btn.textContent = task;
    btn.onclick = () => loadTask(task);
    container.appendChild(btn);
  });
});

function loadTask(taskName) {
  currentTask = taskName;

  document.getElementById("task-container").classList.add("hidden");
  document.getElementById("checklist-section").classList.remove("hidden");

  document.getElementById("task-title").textContent = taskName;

  const list = document.getElementById("checklist");
  list.innerHTML = "";

  data[taskName].forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "check-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `check-${index}`;

    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.textContent = item;

    div.appendChild(checkbox);
    div.appendChild(label);
    list.appendChild(div);
  });

  document.getElementById("clear-btn").onclick = clearChecks;
  document.getElementById("back-btn").onclick = goBack;
}

function clearChecks() {
  document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
}

function goBack() {
  document.getElementById("checklist-section").classList.add("hidden");
  document.getElementById("task-container").classList.remove("hidden");
}
