// main.js

async function search() {
  const q = document.getElementById('query').value.trim();
  const container = document.getElementById('results');
  if (!q) {
    container.innerHTML = '<p style="color: orange">Введите запрос</p>';
    return;
  }
  container.innerHTML = '<p style="color: cyan">Поиск...</p>';

  try {
    const res = await fetch(`https://cloudsearch-131166517111.us-central1.run.app/multiSearch?q=${encodeURIComponent(q)}&limit=20`);
    if (!res.ok) throw new Error("Ошибка ответа сервера: " + res.status);
    const raw = await res.json();

    const data = raw[0]?.rows;
    if (!data || !Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p style="color: yellow">Ничего не нашлось =(</p>';
      return;
    }

    container.innerHTML = '';
    data.forEach(entry => {
      const block = document.createElement('div');
      block.className = 'entry fade-in';

      const title = document.createElement('h3');
      title.innerText = 'Гражданин ↓';
      block.appendChild(title);

      if (entry.name) {
        block.innerHTML += `<p>ФИО: ${entry.name}</p>`;
      }
      if (entry.phone) {
        block.innerHTML += `<p>Телефон: ${entry.phone}</p>`;
      }
      if (entry["personal Id number"]) {
        block.innerHTML += `<p>ID: ${entry["personal Id number"]}</p>`;
      }
      if (entry.birthday?.value) {
        block.innerHTML += `<p>Дата рождения: ${entry.birthday.value}</p>`;
      }
      if (entry.address) {
        block.innerHTML += `<p>Адрес: ${entry.address}</p>`;
      }
      if (entry.district) {
        block.innerHTML += `<p>Регион: ${entry.district}</p>`;
      }

      container.appendChild(block);
    });
  } catch (error) {
    container.innerHTML = '<p style="color:red">Ошибка при поиске: ' + error.message + '</p>';
  }
}

function showIntro() {
  const intro = document.createElement('div');
  intro.className = 'intro-screen';
  intro.innerHTML = '<div class="intro-text">STALK</div>';
  document.body.appendChild(intro);

  setTimeout(() => {
    intro.classList.add('fade-out');
    setTimeout(() => intro.remove(), 1000);
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button')?.addEventListener('click', search);
  if (!localStorage.getItem('introSeen')) {
    showIntro();
    localStorage.setItem('introSeen', 'true');
  }
});
