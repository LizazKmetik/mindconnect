document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.application-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const res = await fetch('http://localhost:5082/api/psychologists/apply', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      alert("Заявку успішно надіслано!");
      form.reset();
    } else {
      const errorText = await res.text();
      alert("Помилка при надсиланні заявки:\n" + errorText);
    }
  });
});
