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

  const sectionArea = document.getElementById("sections");
  sectionArea.innerHTML = "";

  const sections = data[taskName];

  Object.keys(sections).forEach(section => {
    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = section;

    const content = document.createElement("div");
    content.className = "section-content hidden";

    sections[section].forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "check-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const label = document.createElement("label");
      label.textContent = item;

      div.appendChild(checkbox);
      div.appendChild(label);

      content.appendChild(div);
    });

    header.addEventListener("click", () => {
      content.classList.toggle("hidden");
    });

    sectionArea.appendChild(header);
    sectionArea.appendChild(content);
  });

  document.getElementById("clear-btn").onclick = clearChecks;
  document.getElementById("back-btn").onclick = goBack;
}

function clearChecks() {
  document.querySelectorAll("input[type='checkbox']").forEach(cb => (cb.checked = false));
}

function goBack() {
  document.getElementById("checklist-section").classList.add("hidden");
  document.getElementById("task-container").classList.remove("hidden");
}
