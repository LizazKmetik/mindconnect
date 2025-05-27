document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('specialists-list');

    try {
        const response = await fetch('https://localhost:7253/api/psychologists');
        const data = await response.json();

        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'specialist-card';

            card.innerHTML = `
                <img src="${p.photoUrl}" alt="${p.name}">
                <div class="specialist-info">
                    <div class="specialist-name">${p.name}</div>
                    <p>${p.bio}</p>
                    <p>${p.languages || '—'}</p>
                    <p>${p.sessionCount || 0} сесій / ${p.reviewCount || 0} відгуків</p>
                    <div class="specialist-tags">
                        ${parseTags(p.specializations)}
                    </div>
                </div>
                <div>
                    <div class="price">- грн</div>
                    <button class="cta-button">Детальніше</button>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error('Помилка підключення до API:', err);
        container.innerHTML = `
    <div class="center-wrapper">
        <p class="no-results">Немає результатів пошуку 😞</p>
    </div>`;


    }

    function parseTags(json) {
        try {
            const tags = JSON.parse(json);
            return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        } catch {
            return '';
        }
    }
});