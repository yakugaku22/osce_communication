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

  updateTotalProgress(); // ← 課題全体の進行度を初期表示

  Object.keys(sections).forEach(section => {
    // セクション見出し（カウント表示つき）
    const header = document.createElement("div");
    header.className = "section-header";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = section;

    const countSpan = document.createElement("span");
    countSpan.className = "section-count";
    countSpan.textContent = "0 / " + sections[section].length;

    header.appendChild(titleSpan);
    header.appendChild(countSpan);

    // 内容（常に表示）
    const content = document.createElement("div");
    content.className = "section-content";

    sections[section].forEach(item => {
    const div = document.createElement("div");
    div.className = "check-item";

    // チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // ラベル
    const label = document.createElement("label");
    label.textContent = item;

    // ▼ 項目全体をクリックでチェックON/OFF
    div.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      updateSectionCount(content, countSpan);
      updateTotalProgress();
    });

    // ▼ チェックボックス押したときもカウント更新
    checkbox.addEventListener("change", () => {
      updateSectionCount(content, countSpan);
      updateTotalProgress();
    });

    div.appendChild(checkbox);
    div.appendChild(label);
    content.appendChild(div);
  });

    sectionArea.appendChild(header);
    sectionArea.appendChild(content);

    // 初期カウント更新
    updateSectionCount(content, countSpan);
  });

  document.getElementById("clear-btn").onclick = clearChecks;
  document.getElementById("back-btn").onclick = goBack;
}

// セクションごとのカウント更新
function updateSectionCount(content, countSpan) {
  const checks = content.querySelectorAll("input[type='checkbox']");
  const checked = Array.from(checks).filter(c => c.checked).length;
  countSpan.textContent = `${checked} / ${checks.length}`;
}

// 課題全体の進行度更新
function updateTotalProgress() {
  const allChecks = document.querySelectorAll("#sections input[type='checkbox']");
  const checked = Array.from(allChecks).filter(c => c.checked).length;

  const total = allChecks.length;

  const totalArea = document.getElementById("total-progress");
  totalArea.textContent = `進行度： ${checked} / ${total}`;
}

function clearChecks() {
  document.querySelectorAll("input[type='checkbox']").forEach(cb => (cb.checked = false));
  updateTotalProgress();
  document.querySelectorAll(".section-content").forEach(content => {
    const countSpan = content.previousSibling.querySelector(".section-count");
    updateSectionCount(content, countSpan);
  });
}

function goBack() {
  document.getElementById("checklist-section").classList.add("hidden");
  document.getElementById("task-container").classList.remove("hidden");
}

