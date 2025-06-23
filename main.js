// main.js

const schemas = { telegrampt1: [ { key: "Telegram ID", label: "ID" }, { key: "Номер телефона", label: "Номер телефона" }, { key: "Username", label: "Юзернейм" }, { key: "Имя", label: "Имя" } ], telegrampt2: [ { key: "Telegram ID", label: "ID" }, { key: "Номер телефона", label: "Номер телефона" }, { key: "Username", label: "Юзернейм" }, { key: "Имя", label: "Имя" } ], telegrampt3: [ { key: "Telegram ID", label: "ID" }, { key: "Номер телефона", label: "Номер телефона" }, { key: "username", label: "Юзернейм" }, { key: "Имя", label: "Имя" } ], telegrampt4: [ { key: "Telegram ID", label: "ID" }, { key: "Имя", label: "Имя" }, { key: "Фамилия", label: "Фамилия" }, { key: "Почта", label: "Почта" }, { key: "Номер телефона", label: "Номер телефона" } ], telegrampt5: [ { key: "string_field_0", label: "ID" }, { key: "string_field_1", label: "Номер телефона" } ], bolshayaperemena: [ { key: "string_field_0", label: "Фамилия" }, { key: "string_field_1", label: "Имя" }, { key: "string_field_2", label: "Отчество" }, { key: "string_field_3", label: "Дата рождения" }, { key: "string_field_4", label: "Телефон" }, { key: "string_field_5", label: "Почта" }, { key: "string_field_6", label: "Буква класса" }, { key: "string_field_7", label: "Адрес уч.заведения" } ], vtbclients: [ { key: "Фамилия", label: "Фамилия" }, { key: "Имя", label: "Имя" }, { key: "Отчество", label: "Отчество" }, { key: "Дата рождения", label: "Дата рождения" }, { key: "Местоположение", label: "Местоположение" }, { key: "Номер телефона", label: "Номер телефона" }, { key: "Почта", label: "Почта" } ], zonatelecom: [ { key: "Фамилия", label: "Фамилия" }, { key: "Имя", label: "Имя" }, { key: "Номер телефона", label: "Номер телефона" }, { key: "Адрес", label: "Адрес" }, { key: "Почта", label: "Почта" }, { key: "Контактный телефон", label: "Контактный телефон" } ], medicine_and_pharmacy: [ { key: "ФИО", label: "ФИО" }, { key: "Номер телефона", label: "Номер телефона" }, { key: "Город", label: "Город" }, { key: "Дата рождения", label: "Дата рождения" }, { key: "ИНН", label: "ИНН" } ], RussianCitizens2025: [ { key: "Номер телефона", label: "Номер телефона" }, { key: "ФИО", label: "ФИО" }, { key: "Дата рождения", label: "Дата рождения" }, { key: "ИНН", label: "ИНН" } ] };

const dbTitles = { telegrampt1: "Telegram", telegrampt2: "Telegram", telegrampt3: "Telegram", telegrampt4: "Telegram", telegrampt5: "Telegram", bolshayaperemena: "Большая перемена", vtbclients: "Клиенты ВТБ", zonatelecom: "Зона Телеком", medicine_and_pharmacy: "Медицина и аптеки", RussianCitizens2025: "Граждане РФ 2025" };

async function search() { const q = document.getElementById('query').value.trim(); const container = document.getElementById('results'); if (!q) return; container.innerHTML = '<p>Поиск...</p>';

try { const res = await fetch(https://cloudsearch-131166517111.us-central1.run.app/multiSearch?q=${encodeURIComponent(q)}&limit=20); if (!res.ok) throw new Error("Ошибка ответа сервера"); const data = await res.json();

container.innerHTML = '';
if (!Array.isArray(data) || data.length === 0) {
  container.innerHTML = '<p>Ничего не найдено.</p>';
  return;
}

data.forEach(entry => {
  const db = entry.source || 'unknown';
  const schema = schemas[db];
  const dbName = dbTitles[db] || db;

  const block = document.createElement('div');
  block.className = 'entry';

  const title = document.createElement('h3');
  title.innerText = dbName + ' ↓';
  block.appendChild(title);

  if (schema) {
    schema.forEach(f => {
      if (entry[f.key]) {
        const line = document.createElement('p');
        line.innerText = `${f.label}: ${entry[f.key]}`;
        block.appendChild(line);
      }
    });
  } else {
    const raw = document.createElement('pre');
    raw.innerText = JSON.stringify(entry, null, 2);
    block.appendChild(raw);
  }

  container.appendChild(block);
});

} catch (error) { console.error("Ошибка при поиске:", error); container.innerHTML = '<p style="color:red">Произошла ошибка при поиске.</p>'; } }

