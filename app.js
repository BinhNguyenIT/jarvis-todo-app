const STORAGE_KEY = 'jarvis-todo-list-v2';
const THEME_STORAGE_KEY = 'jarvis-theme-v1';
const THEME_OPTIONS = ['normal', 'galaxy', 'cute'];

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const priorityInput = document.getElementById('priorityInput');
const dueDateInput = document.getElementById('dueDateInput');
const todoList = document.getElementById('todoList');
const todoItemTemplate = document.getElementById('todoItemTemplate');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filters = document.getElementById('filters');
const totalCount = document.getElementById('totalCount');
const activeCountEl = document.getElementById('activeCount');
const completedCountEl = document.getElementById('completedCount');
const priorityCountEl = document.getElementById('priorityCount');
const progressLabel = document.getElementById('progressLabel');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const todayLabel = document.getElementById('todayLabel');
const sortBtn = document.getElementById('sortBtn');
const themePicker = document.getElementById('themePicker');

let currentFilter = 'all';
let smartSortEnabled = true;
let todos = loadTodos();

function seedTodos() {
  const today = formatDateInput(new Date());
  return [
    { id: crypto.randomUUID(), text: 'Review redesigned JARVIS Todo app', completed: false, priority: 'high', dueDate: today, createdAt: Date.now() },
    { id: crypto.randomUUID(), text: 'Add your real missions here', completed: false, priority: 'medium', dueDate: '', createdAt: Date.now() - 1000 },
  ];
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTodos();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedTodos();
  } catch {
    return seedTodos();
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (THEME_OPTIONS.includes(saved)) return saved;
    if (saved === 'dark' || saved === 'light') return 'normal';
    return null;
  } catch {
    return null;
  }
}

function setTheme(theme, persist) {
  const nextTheme = THEME_OPTIONS.includes(theme) ? theme : 'normal';
  document.documentElement.setAttribute('data-theme', nextTheme);
  if (themePicker) {
    [...themePicker.querySelectorAll('[data-theme-option]')].forEach(button => {
      const isActive = button.dataset.themeOption === nextTheme;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }
  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }
}

function initTheme() {
  const storedTheme = getStoredTheme();
  setTheme(storedTheme || 'normal', false);

  if (themePicker) {
    themePicker.addEventListener('click', event => {
      const button = event.target.closest('[data-theme-option]');
      if (!button) return;
      setTheme(button.dataset.themeOption, true);
    });
  }
}

function formatDateInput(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function formatHumanDate(value) {
  if (!value) return 'No due date';
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date);
}

function isToday(value) {
  return value === formatDateInput(new Date());
}

function isOverdue(value) {
  if (!value) return false;
  return value < formatDateInput(new Date());
}

function addTodo(text, priority, dueDate) {
  todos.unshift({
    id: crypto.randomUUID(),
    text,
    priority,
    dueDate,
    completed: false,
    createdAt: Date.now(),
  });
  saveTodos();
  render();
}

function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
}

function editTodo(id) {
  const current = todos.find(todo => todo.id === id);
  if (!current) return;
  const nextText = window.prompt('Edit task', current.text)?.trim();
  if (!nextText) return;
  todos = todos.map(todo => todo.id === id ? { ...todo, text: nextText } : todo);
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  render();
}

function getFilteredTodos() {
  const base = (() => {
    switch (currentFilter) {
      case 'active': return todos.filter(todo => !todo.completed);
      case 'completed': return todos.filter(todo => todo.completed);
      case 'today': return todos.filter(todo => !todo.completed && isToday(todo.dueDate));
      case 'high': return todos.filter(todo => !todo.completed && todo.priority === 'high');
      default: return [...todos];
    }
  })();

  if (!smartSortEnabled) return base;

  return base.sort((a, b) => {
    if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
    const priorityRank = { high: 0, medium: 1, low: 2 };
    if (priorityRank[a.priority] !== priorityRank[b.priority]) return priorityRank[a.priority] - priorityRank[b.priority];
    if (!!a.dueDate !== !!b.dueDate) return a.dueDate ? -1 : 1;
    if (a.dueDate && b.dueDate && a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}

function updateStats() {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const highPriorityCount = todos.filter(todo => !todo.completed && todo.priority === 'high').length;
  const percent = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  taskCount.textContent = `${activeCount} active / ${todos.length} total`;
  totalCount.textContent = String(todos.length);
  activeCountEl.textContent = String(activeCount);
  completedCountEl.textContent = String(completedCount);
  priorityCountEl.textContent = String(highPriorityCount);
  progressLabel.textContent = `${percent}%`;
  progressText.textContent = `${percent}% complete`;
  progressBar.style.width = `${percent}%`;
}

function renderEmpty() {
  const empty = document.createElement('li');
  empty.className = 'empty';
  empty.innerHTML = `<strong>Nothing on the board.</strong><span>Either you're absurdly organized, or you're procrastinating professionally.</span>`;
  todoList.appendChild(empty);
}

function render() {
  todoList.innerHTML = '';
  const items = getFilteredTodos();
  updateStats();

  if (!items.length) {
    renderEmpty();
    return;
  }

  items.forEach(todo => {
    const node = todoItemTemplate.content.firstElementChild.cloneNode(true);
    const toggle = node.querySelector('.toggle');
    const text = node.querySelector('.todo-text');
    const del = node.querySelector('.delete');
    const edit = node.querySelector('.edit');
    const priorityBadge = node.querySelector('.priority-badge');
    const dueBadge = node.querySelector('.due-badge');
    const meta = node.querySelector('.todo-meta');

    toggle.checked = todo.completed;
    text.textContent = todo.text;
    node.dataset.id = todo.id;
    node.classList.toggle('completed', todo.completed);

    priorityBadge.textContent = `${todo.priority} priority`;
    priorityBadge.className = `badge priority-badge ${todo.priority}`;

    if (todo.dueDate) {
      const dueText = isToday(todo.dueDate) ? 'Due today' : `Due ${formatHumanDate(todo.dueDate)}`;
      dueBadge.textContent = dueText;
      dueBadge.hidden = false;
      dueBadge.className = `badge due-badge ${isOverdue(todo.dueDate) && !todo.completed ? 'overdue' : ''}`.trim();
    } else {
      dueBadge.hidden = true;
    }

    meta.textContent = todo.completed
      ? 'Completed. Lovely.'
      : isOverdue(todo.dueDate)
        ? 'Overdue. Mildly offensive.'
        : todo.dueDate
          ? `Scheduled for ${formatHumanDate(todo.dueDate)}`
          : 'No due date. Pure chaos.';

    toggle.addEventListener('change', () => toggleTodo(todo.id));
    del.addEventListener('click', () => deleteTodo(todo.id));
    edit.addEventListener('click', () => editTodo(todo.id));

    todoList.appendChild(node);
  });
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  addTodo(text, priorityInput.value, dueDateInput.value);
  todoInput.value = '';
  priorityInput.value = 'medium';
  dueDateInput.value = '';
  todoInput.focus();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  currentFilter = button.dataset.filter;
  [...filters.querySelectorAll('.filter')].forEach(btn => btn.classList.toggle('active', btn === button));
  render();
});

sortBtn.addEventListener('click', () => {
  smartSortEnabled = !smartSortEnabled;
  sortBtn.textContent = `Sort: ${smartSortEnabled ? 'smart' : 'manual'}`;
  render();
});

initTheme();
todayLabel.textContent = new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date());
render();
