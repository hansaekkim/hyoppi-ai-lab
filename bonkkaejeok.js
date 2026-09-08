const STORAGE_KEY = "bonkkaejeok-note";

const CATEGORY_LABELS = {
  bon: "본 것",
  kkae: "깨달은 것",
  jeok: "적용할 것",
};

const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const dateInput = document.getElementById("read-date");
const entryText = document.getElementById("entry-text");
const categoryButtons = document.querySelectorAll(".bkj-category-btn");
const addEntryBtn = document.getElementById("add-entry-btn");
const previewText = document.getElementById("preview-text");
const copyBtn = document.getElementById("copy-btn");
const resetBtn = document.getElementById("reset-btn");
const copyFeedback = document.getElementById("copy-feedback");

let state = {
  title: "",
  author: "",
  date: "",
  entries: [],
};
let selectedCategory = "bon";
let nextId = 1;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      state = {
        title: saved.title || "",
        author: saved.author || "",
        date: saved.date || "",
        entries: Array.isArray(saved.entries) ? saved.entries : [],
      };
      nextId = state.entries.reduce((max, entry) => Math.max(max, entry.id), 0) + 1;
    }
  } catch (error) {
    state = { title: "", author: "", date: "", entries: [] };
  }

  if (!state.date) {
    state.date = new Date().toISOString().slice(0, 10);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setSelectedCategory(category) {
  selectedCategory = category;
  categoryButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.category === category));
  });
}

function addEntry() {
  const text = entryText.value.trim();
  if (!text) {
    entryText.focus();
    return;
  }

  state.entries.push({ id: nextId++, category: selectedCategory, text });
  entryText.value = "";
  entryText.focus();

  saveState();
  render();
}

function deleteEntry(id) {
  state.entries = state.entries.filter((entry) => entry.id !== id);
  saveState();
  render();
}

function renderColumns() {
  ["bon", "kkae", "jeok"].forEach((category) => {
    const list = document.getElementById(`list-${category}`);
    const emptyMessage = document.querySelector(`[data-empty-for="${category}"]`);
    const entries = state.entries.filter((entry) => entry.category === category);

    list.innerHTML = "";
    entries.forEach((entry) => {
      const item = document.createElement("li");
      item.className = "bkj-entry-item";

      const paragraph = document.createElement("p");
      paragraph.textContent = entry.text;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "bkj-entry-delete";
      deleteButton.setAttribute("aria-label", "이 항목 삭제");
      deleteButton.textContent = "✕";
      deleteButton.addEventListener("click", () => deleteEntry(entry.id));

      item.appendChild(paragraph);
      item.appendChild(deleteButton);
      list.appendChild(item);
    });

    emptyMessage.style.display = entries.length === 0 ? "block" : "none";
  });
}

function buildPreviewText() {
  const lines = [];
  const titleLine = [state.title, state.author ? `- ${state.author}` : ""].filter(Boolean).join(" ");

  if (titleLine) {
    lines.push(`📖 ${titleLine}`);
  }
  if (state.date) {
    lines.push(`읽은 날짜: ${state.date}`);
  }
  if (lines.length) {
    lines.push("");
  }

  const sections = [
    { category: "bon", heading: "1. 본 것 (저자의 핵심 내용 요약)" },
    { category: "kkae", heading: "2. 깨달은 것 (깨달은 점과 통찰)" },
    { category: "jeok", heading: "3. 적용할 것 (실생활 적용 실행 계획)" },
  ];

  sections.forEach((section, index) => {
    const entries = state.entries.filter((entry) => entry.category === section.category);
    lines.push(section.heading);
    if (entries.length === 0) {
      lines.push("- (아직 작성된 내용이 없어요)");
    } else {
      entries.forEach((entry) => lines.push(`- ${entry.text}`));
    }
    if (index < sections.length - 1) {
      lines.push("");
    }
  });

  return lines.join("\n");
}

function renderPreview() {
  previewText.textContent = buildPreviewText();
}

function render() {
  renderColumns();
  renderPreview();
}

async function copyPreview() {
  const text = previewText.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyFeedback.textContent = "복사되었어요! 블로그 글쓰기 화면에 붙여넣기 해보세요.";
  } catch (error) {
    copyFeedback.textContent = "복사에 실패했어요. 텍스트를 직접 선택해 복사해주세요.";
  }
  setTimeout(() => {
    copyFeedback.textContent = "";
  }, 4000);
}

function resetAll() {
  const confirmed = window.confirm("책 정보와 모든 노트 항목을 초기화할까요?");
  if (!confirmed) {
    return;
  }

  state = { title: "", author: "", date: new Date().toISOString().slice(0, 10), entries: [] };
  nextId = 1;
  saveState();

  titleInput.value = "";
  authorInput.value = "";
  dateInput.value = state.date;
  entryText.value = "";

  render();
}

function init() {
  loadState();

  titleInput.value = state.title;
  authorInput.value = state.author;
  dateInput.value = state.date;

  titleInput.addEventListener("input", () => {
    state.title = titleInput.value;
    saveState();
    renderPreview();
  });

  authorInput.addEventListener("input", () => {
    state.author = authorInput.value;
    saveState();
    renderPreview();
  });

  dateInput.addEventListener("input", () => {
    state.date = dateInput.value;
    saveState();
    renderPreview();
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => setSelectedCategory(button.dataset.category));
  });

  addEntryBtn.addEventListener("click", addEntry);
  entryText.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      addEntry();
    }
  });

  copyBtn.addEventListener("click", copyPreview);
  resetBtn.addEventListener("click", resetAll);

  setSelectedCategory(selectedCategory);
  render();
}

init();
