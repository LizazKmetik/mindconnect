function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm form");
  const registerForm = document.querySelector("#registerForm form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[name="email"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;

      try {
        const res = await fetch("http://localhost:5082/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Невірні дані");

        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        alert("Успішний вхід!");
        window.location.href = "main.html";
      } catch (err) {
        alert("Помилка входу: " + err.message);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = registerForm.querySelector('input[name="username"]').value;
      const email = registerForm.querySelector('input[name="email"]').value;
      const password = registerForm.querySelector('input[name="password"]').value;

      try {
        const res = await fetch("http://localhost:5082/api/auth/register", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) throw new Error("Помилка реєстрації");

        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        alert("Успішна реєстрація!");
        window.location.href = "main.html";
      } catch (err) {
        alert("Помилка реєстрації: " + err.message);
      }
    });
  }
});

window.handleGoogleCredentialResponse = async function (response) {
  try {
    const credential = response.credential;
    const data = parseJwt(credential);

    let role = "Client";
    let name = data.name;

    const res = await fetch(`http://localhost:5082/api/users/by-email/${encodeURIComponent(data.email)}`);

    if (res.ok) {
      const userFromDb = await res.json();
      if (userFromDb.role) {
        role = userFromDb.role;
      }
      if (userFromDb.name) {
        name = userFromDb.name; // Використовуємо ім’я з бази
      }
    } else {
      const createRes = await fetch("http://localhost:5082/api/users/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      });

      if (!createRes.ok) throw new Error("Помилка створення нового користувача");
    }

    const user = {
      name: name,
      email: data.email,
      role: role
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Вхід через Google успішний!");
    window.location.href = "main.html";

  } catch (err) {
    alert("Помилка Google входу: " + err.message);
  }
};



