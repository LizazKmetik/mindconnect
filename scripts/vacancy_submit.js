document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".application-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      alert("Будь ласка, увійдіть у систему, щоб подати заявку.");
      return;
    }

    const formData = new FormData(form);
    formData.append("email", user.email);

    try {
      const response = await fetch("http://localhost:5082/api/psychologists/apply", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("Заявку успішно відправлено!");
        form.reset();
      } else {
        const errText = await response.text();
        console.error("Помилка:", errText);
        throw new Error(errText || "Помилка під час відправлення.");
      }
    } catch (error) {
      alert("Не вдалося відправити заявку: " + error.message);
      console.error("Помилка при відправці заявки:", error);
      console.log("Відправлено:", ...formData.entries());

    }
  });
});
