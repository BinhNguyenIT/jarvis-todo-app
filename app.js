const STORAGE_KEY = 'jarvis-todo-list-v2';
const THEME_STORAGE_KEY = 'jarvis-theme-v1';
const THEME_OPTIONS = ['normal', 'galaxy', 'cute'];
const NOTE_LIMIT = 500;
const NOTE_SNIPPET_LIMIT = 160;
const COMPLETED_NOTE_META_LIMIT = 120;

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const noteInput = document.getElementById('noteInput');
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

const taskModal = document.getElementById('taskModal');
const taskModalTitle = document.getElementById('taskModalTitle');
const taskModalEyebrow = document.getElementById('taskModalEyebrow');
const taskModalClose = document.getElementById('taskModalClose');
const taskEditForm = document.getElementById('taskEditForm');
const modalTitleInput = document.getElementById('modalTitleInput');
const modalNoteInput = document.getElementById('modalNoteInput');
const modalNoteCount = document.getElementById('modalNoteCount');
const taskDetailView = document.getElementById('taskDetailView');
const detailTitle = document.getElementById('detailTitle');
const detailNote = document.getElementById('detailNote');

let currentFilter = 'all';
let smartSortEnabled = true;
let activeModal = null;
let editingTodoId = null;
let lastModalTrigger = null;
let todos = loadTodos();

function sanitizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function sanitizeNote(value) {
  return sanitizeText(value).slice(0, NOTE_LIMIT);
}

function truncateText(value, limit) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit).trimEnd()}...`;
}

function normalizeTodo(todo, index = 0) {
  const createdAt = typeof todo?.createdAt === 'number' ? todo.createdAt : Date.now() - index;

  return {
    id: typeof todo?.id === 'string' && todo.id ? todo.id : crypto.randomUUID(),
    text: sanitizeText(todo?.text),
    note: sanitizeNote(todo?.note),
    completed: Boolean(todo?.completed),
    priority: ['high', 'medium', 'low'].includes(todo?.priority) ? todo.priority : 'medium',
    dueDate: typeof todo?.dueDate === 'string' ? todo.dueDate : '',
    createdAt,
  };
}

function seedTodos() {
  const today = formatDateInput(new Date());
  return [
    normalizeTodo({
      id: crypto.randomUUID(),
      text: 'Review redesigned JARVIS Todo app',
      note: 'Check the new note flow, open the detail modal, and make sure completed items still keep the context visible.',
      completed: false,
      priority: 'high',
      dueDate: today,
      createdAt: Date.now(),
    }),
    normalizeTodo({
      id: crypto.randomUUID(),
      text: 'Add your real missions here',
      note: '',
      completed: false,
      priority: 'medium',
      dueDate: '',
      createdAt: Date.now() - 1000,
    }),
  ];
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTodos();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedTodos();
    return parsed.map((todo, index) => normalizeTodo(todo, index)).filter(todo => todo.text);
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

function addTodo(text, note, priority, dueDate) {
  todos.unshift(normalizeTodo({
    id: crypto.randomUUID(),
    text,
    note,
    priority,
    dueDate,
    completed: false,
    createdAt: Date.now(),
  }));
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

function updateTodo(id, updates) {
  todos = todos.map(todo => todo.id === id ? normalizeTodo({ ...todo, ...updates }) : todo);
  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
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

function getMetaText(todo) {
  if (todo.completed) {
    return todo.note
      ? `Completed. Context kept: ${truncateText(todo.note, COMPLETED_NOTE_META_LIMIT)}`
      : 'Completed. Lovely.';
  }

  if (isOverdue(todo.dueDate)) {
    return 'Overdue. Mildly offensive.';
  }

  if (todo.dueDate) {
    return `Scheduled for ${formatHumanDate(todo.dueDate)}`;
  }

  return 'No due date. Pure chaos.';
}

function openModal(mode, todo, trigger) {
  activeModal = mode;
  lastModalTrigger = trigger || document.activeElement;
  taskModal.hidden = false;
  taskModal.classList.add('open');
  document.body.classList.add('modal-open');

  if (mode === 'edit') {
    editingTodoId = todo.id;
    taskModalEyebrow.textContent = 'Task editor';
    taskModalTitle.textContent = 'Edit task';
    taskEditForm.hidden = false;
    taskDetailView.hidden = true;
    modalTitleInput.value = todo.text;
    modalNoteInput.value = todo.note;
    updateModalNoteCount();
    queueMicrotask(() => modalTitleInput.focus());
    return;
  }

  editingTodoId = null;
  taskModalEyebrow.textContent = 'Task details';
  taskModalTitle.textContent = 'Task note';
  taskEditForm.hidden = true;
  taskDetailView.hidden = false;
  detailTitle.textContent = todo.text;
  detailNote.textContent = todo.note;
  queueMicrotask(() => taskModalClose.focus());
}

function closeModal() {
  if (taskModal.hidden) return;
  const focusTarget = lastModalTrigger;
  activeModal = null;
  editingTodoId = null;
  lastModalTrigger = null;
  taskModal.hidden = true;
  taskModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  taskEditForm.reset();
  taskDetailView.hidden = true;
  taskEditForm.hidden = true;
  updateModalNoteCount();

  if (focusTarget instanceof HTMLElement && focusTarget.isConnected) {
    focusTarget.focus();
  }
}

function updateModalNoteCount() {
  modalNoteCount.textContent = String(modalNoteInput.value.length);
}

function renderTodos() {
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
    const noteWrap = node.querySelector('.todo-note-wrap');
    const note = node.querySelector('.todo-note');
    const noteDetailButton = node.querySelector('.note-detail-button');

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

    if (todo.note) {
      noteWrap.hidden = false;
      note.textContent = truncateText(todo.note, NOTE_SNIPPET_LIMIT);
      noteDetailButton.hidden = false;
      noteDetailButton.addEventListener('click', event => openModal('detail', todo, event.currentTarget));
    } else {
      noteWrap.hidden = true;
    }

    meta.textContent = getMetaText(todo);

    toggle.addEventListener('change', () => toggleTodo(todo.id));
    del.addEventListener('click', () => deleteTodo(todo.id));
    edit.addEventListener('click', event => openModal('edit', todo, event.currentTarget));

    todoList.appendChild(node);
  });
}

function renderApp() {
  renderTodos();
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = sanitizeText(todoInput.value);
  if (!text) return;

  addTodo(text, sanitizeNote(noteInput.value), priorityInput.value, dueDateInput.value);
  todoInput.value = '';
  noteInput.value = '';
  priorityInput.value = 'medium';
  dueDateInput.value = '';
  todoInput.focus();
});

taskEditForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!editingTodoId) return;

  const nextText = sanitizeText(modalTitleInput.value);
  if (!nextText) {
    modalTitleInput.focus();
    return;
  }

  updateTodo(editingTodoId, {
    text: nextText,
    note: sanitizeNote(modalNoteInput.value),
  });
  closeModal();
});

modalNoteInput.addEventListener('input', updateModalNoteCount);

taskModal.addEventListener('click', event => {
  const closeTarget = event.target.closest('[data-close-modal]');
  if (closeTarget) {
    closeModal();
  }
});

taskModalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !taskModal.hidden) {
    closeModal();
  }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  currentFilter = button.dataset.filter;
  [...filters.querySelectorAll('.filter')].forEach(btn => btn.classList.toggle('active', btn === button));
  renderTodos();
});

sortBtn.addEventListener('click', () => {
  smartSortEnabled = !smartSortEnabled;
  sortBtn.textContent = `Sort: ${smartSortEnabled ? 'smart' : 'manual'}`;
  renderTodos();
});

initTheme();
todayLabel.textContent = new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date());
renderApp();
