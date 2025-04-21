let guestbook = JSON.parse(localStorage.getItem('guestbook')) || [];

function saveEntries() {
  localStorage.setItem('guestbook', JSON.stringify(guestbook));
}

function renderEntries() {
  const list = document.getElementById('guestList');
  list.innerHTML = '';
  guestbook.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'entry' + (entry.done ? ' done' : '');
    div.innerHTML = `
      <h4>${entry.name}</h4>
      <p>${entry.message}</p>
      <small>${entry.time}</small><br/>
      <button onclick="toggleDone(${index})">${entry.done ? 'Belum' : 'Selesai'}</button>
      <button onclick="deleteEntry(${index})">Hapus</button>
    `;
    list.appendChild(div);
  });
}

function addEntry() {
  const name = document.getElementById('guestName').value.trim();
  const message = document.getElementById('guestMessage').value.trim();
  if (name && message) {
    const time = new Date().toLocaleString();
    guestbook.push({ name, message, time, done: false });
    saveEntries();
    renderEntries();
    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
  }
}

function deleteEntry(index) {
  guestbook.splice(index, 1);
  saveEntries();
  renderEntries();
}

function toggleDone(index) {
  guestbook[index].done = !guestbook[index].done;
  saveEntries();
  renderEntries();
}

renderEntries();