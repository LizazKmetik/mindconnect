let allApplications = [];

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('applications-list');

  try {
    const response = await fetch('http://localhost:5082/api/psychologists/applications');
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();

    if (data.length === 0) {
      container.innerHTML = "<p>Заявок наразі немає.</p>";
      return;
    }

    allApplications = data;
    renderApplications('all');

    document.getElementById('filter-select').addEventListener('change', (e) => {
      filterApplications(e.target.value);
    });

  } catch (err) {
    container.innerHTML = "<p>Не вдалося завантажити заявки.</p>";
    console.error("Помилка:", err);
  }
});

function renderApplications(filterType) {
  const container = document.getElementById('applications-list');
  container.innerHTML = '';

  let filtered = allApplications;

  if (filterType === 'moderator') {
    filtered = allApplications.filter(a => !a.verified && a.isModeratorApproved);
  } else if (filterType === 'pending') {
    filtered = allApplications.filter(a => !a.verified && !a.isModeratorApproved);
  }

  if (filtered.length === 0) {
    container.innerHTML = "<p>Заявки за цим фільтром не знайдені.</p>";
    return;
  }

  filtered.forEach(app => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="summary">
        <p><strong>ПІБ:</strong> ${app.name}</p>
        <p><strong>Email:</strong> ${app.email}</p>
        <p><strong>Телефон:</strong> ${app.phone}</p>
        <button class="toggle">Детальніше</button>
      </div>
      <div class="details hidden">
        <p><strong>Спеціалізація:</strong> ${app.specializations}</p>
        <p><strong>Стаж:</strong> ${app.experienceYears} років</p>
        <p><strong>Опис:</strong> ${app.bio}</p>
        <p><strong>Сертифікати:</strong><br>
          ${app.certificateLinks.map(link => `<a href="http://localhost:5082${link}" target="_blank">🖼️ Переглянути</a>`).join('<br>')}
        </p>
        <div class="actions">
          <button class="moderator" data-id="${app.userId}" ${app.isModeratorApproved ? "disabled" : ""}>Схвалити як модератор</button>
          <button class="accept" data-id="${app.userId}" ${app.verified ? "disabled" : ""}>👍 Прийняти</button>
          <button class="reject disabled" disabled>👎 Відхилити</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  attachButtonHandlers();
}

function attachButtonHandlers() {
  document.querySelectorAll('.toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.closest('.card').querySelector('.details');
      details.classList.toggle('hidden');
    });
  });

  document.querySelectorAll('.accept').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (!confirm("Справді хочете схвалити цю заявку?")) return;

      const res = await fetch(`http://localhost:5082/api/psychologists/approve/${id}`, {
        method: 'POST'
      });

      if (res.ok) {
        alert("Заявку повністю схвалено");
        btn.closest('.card').remove();
      } else {
        const msg = await res.text();
        alert("Помилка при схваленні:\n" + msg);
      }
    });
  });

  document.querySelectorAll('.moderator').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (!confirm("Справді хочете схвалити як модератор?")) return;

      const res = await fetch(`http://localhost:5082/api/psychologists/moderator/approve/${id}`, {
        method: 'POST'
      });

      if (res.ok) {
        alert("✅ Модератор схвалив заявку");
        btn.disabled = true;
      } else {
        const msg = await res.text();
        alert("Помилка при модераторському схваленні:\n" + msg);
      }
    });
  });
}

function filterApplications(type) {
  renderApplications(type);
}
