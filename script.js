// Save logs locally in browser
const KEY = 'nextgen_support_logs_v1';

function loadLogs() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  localStorage.setItem(KEY, JSON.stringify(logs));
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector('#logTable tbody');
  if (!tbody) return;
  const logs = loadLogs();
  tbody.innerHTML = '';
  logs.forEach(l => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${l.name}</td><td>${l.dept}</td><td>${l.title}</td><td>${l.urgency}</td>`;
    tbody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  const form = document.querySelector('#supportForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, select');
    const [name, dept, title, urgency] = Array.from(inputs).map(i => i.value);
    const logs = loadLogs();
    logs.push({ name, dept, title, urgency });
    saveLogs(logs);
    form.reset();
  });
});
