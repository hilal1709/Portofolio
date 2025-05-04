async function fetchJSONPlaceholderData() {
  try {
      const endpoints = {
          photos: 'https://jsonplaceholder.typicode.com/photos?_limit=12',
          posts: 'https://jsonplaceholder.typicode.com/posts?_limit=10',
          comments: 'https://jsonplaceholder.typicode.com/comments?_limit=10',
          albums: 'https://jsonplaceholder.typicode.com/albums?_limit=10',
          todos: 'https://jsonplaceholder.typicode.com/todos?_limit=10',
          users: 'https://jsonplaceholder.typicode.com/users'
      };

      const results = {};

      const promises = Object.entries(endpoints).map(async ([key, url]) => {
          const response = await fetch(url);
          
          if (!response.ok) {
              throw new Error(`Network response was not ok for ${key}: ${response.status}`);
          }
          
          const data = await response.json();
          results[key] = data;
          console.log(`Data ${key} berhasil diambil:`, data.length, 'item');
          return { key, data };
      });

      await Promise.all(promises);

      displayAPIPhotos(results.photos);
      displayPosts(results.posts);
      displayComments(results.comments);
      displayAlbums(results.albums);
      displayTodos(results.todos);
      displayUsers(results.users);
      
      return results;
  } catch (error) {
      console.error('Error mengambil data:', error);
      displayError(error.message);
      return null;
  }
}

function displayError(message) {
  const containers = [
      'api-gallery',
      'posts-container',
      'comments-container',
      'albums-container',
      'todos-container',
      'users-container'
  ];
  
  containers.forEach(id => {
      const container = document.getElementById(id);
      if (container) {
          container.innerHTML = `<p class="error">Error: ${message}</p>`;
      }
  });
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

function displayPosts(posts) {
  const postsContainer = document.getElementById('posts-container');
  if (!postsContainer) return;
  
  postsContainer.innerHTML = '';
  
  posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'api-item';
      
      postElement.innerHTML = `
          <h4>${post.title}</h4>
          <p>${post.body}</p>
          <small>User ID: ${post.userId} | Post ID: ${post.id}</small>
      `;
      
      postsContainer.appendChild(postElement);
  });
}

function displayComments(comments) {
  const commentsContainer = document.getElementById('comments-container');
  if (!commentsContainer) return;
  
  commentsContainer.innerHTML = '';
  
  comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.className = 'api-item comment-item';
      
      commentElement.innerHTML = `
          <h4>${comment.name}</h4>
          <p>${comment.body}</p>
          <small>Email: ${comment.email} | Post ID: ${comment.postId}</small>
      `;
      
      commentsContainer.appendChild(commentElement);
  });
}

function displayAlbums(albums) {
  const albumsContainer = document.getElementById('albums-container');
  if (!albumsContainer) return;
  
  albumsContainer.innerHTML = '';
  
  albums.forEach(album => {
      const albumElement = document.createElement('div');
      albumElement.className = 'api-item album-item';
      
      albumElement.innerHTML = `
          <h4>${album.title}</h4>
          <small>User ID: ${album.userId} | Album ID: ${album.id}</small>
      `;
      
      albumsContainer.appendChild(albumElement);
  });
}

function displayTodos(todos) {
  const todosContainer = document.getElementById('todos-container');
  if (!todosContainer) return;
  
  todosContainer.innerHTML = '';
  
  todos.forEach(todo => {
      const todoElement = document.createElement('div');
      todoElement.className = `api-item todo-item ${todo.completed ? 'completed' : 'pending'}`;
      
      todoElement.innerHTML = `
          <h4>${todo.title}</h4>
          <p>Status: ${todo.completed ? 'Selesai' : 'Belum Selesai'}</p>
          <small>User ID: ${todo.userId}</small>
      `;
      
      todosContainer.appendChild(todoElement);
  });
}

function displayUsers(users) {
  const usersContainer = document.getElementById('users-container');
  if (!usersContainer) return;
  
  usersContainer.innerHTML = '';
  
  users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.className = 'api-item user-item';
      
      userElement.innerHTML = `
          <h4>${user.name}</h4>
          <p>Username: ${user.username}</p>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Website: ${user.website}</p>
          <small>Company: ${user.company.name}</small>
      `;
      
      usersContainer.appendChild(userElement);
  });
}

let guestbook = JSON.parse(localStorage.getItem('guestbook')) || [];

function saveEntries() {
  localStorage.setItem('guestbook', JSON.stringify(guestbook));
}

function renderEntries() {
  const list = document.getElementById('guestList');
  if (!list) return;
  
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

document.addEventListener('DOMContentLoaded', function() {
  renderEntries();  
  fetchPhotos();    
  fetchJSONPlaceholderData(); 
});