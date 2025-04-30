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
async function fetchPhotos() {
  try {
    const apiGallery = document.getElementById('api-gallery');
    if (apiGallery) {
      apiGallery.innerHTML = '<p class="loading">Memuat foto...</p>';
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=12');
    
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }
    
    const photos = await response.json();
    console.log('Data foto berhasil diambil:', photos.length, 'item');
    
    displayAPIPhotos(photos);
  } catch (error) {
    console.error('Error mengambil foto:', error);
    const apiGallery = document.getElementById('api-gallery');
    if (apiGallery) {
      apiGallery.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }
}

function displayAPIPhotos(photos) {
  const apiGallery = document.getElementById('api-gallery');
  if (!apiGallery) return;
  
  apiGallery.innerHTML = '';
  
  if (photos.length === 0) {
    apiGallery.innerHTML = '<p>Tidak ada foto yang ditemukan</p>';
    return;
  }
  
  photos.forEach(photo => {
    const photoElement = document.createElement('div');
    photoElement.className = 'api-photo-item';
    
    photoElement.innerHTML = `
      <img src="${photo.thumbnailUrl}" alt="${photo.title}">
      <div class="photo-info">
        <h4>${photo.title.substring(0, 40)}${photo.title.length > 40 ? '...' : ''}</h4>
        <p>Album ID: ${photo.albumId}</p>
      </div>
    `;
    
    apiGallery.appendChild(photoElement);
  });
}
document.addEventListener('DOMContentLoaded', function() {
  renderEntries();
  fetchPhotos();   
});