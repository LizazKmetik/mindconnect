document.addEventListener("DOMContentLoaded", async () => {
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (!headerPlaceholder) return;

  try {
    const response = await fetch("header.html");
    const html = await response.text();
    headerPlaceholder.innerHTML = html;

    const user = JSON.parse(localStorage.getItem("user"));
    const container = document.getElementById("user-area");

    if (!container) return;

    if (user) {
      container.innerHTML = `
        <div class="user-menu-wrapper">
          <div class="user-menu-button" id="userMenuButton">
            <span class="profile-icon">👤</span>
            <span class="username">${user.name || user.email}</span>
          </div>
          <div class="user-dropdown" id="userDropdown">
            <button onclick="location.href='profile.html'">Профіль</button>
            <button onclick="location.href='settings.html'">Налаштування</button>
            <button id="logoutBtn">Вийти</button>
          </div>
        </div>
      `;

      const menuButton = document.getElementById("userMenuButton");
      const dropdown = document.getElementById("userDropdown");

      menuButton.addEventListener("click", (e) => {
        dropdown.classList.toggle("show");
        e.stopPropagation();
      });

      document.addEventListener("click", () => {
        dropdown.classList.remove("show");
      });

      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        location.reload();
      });
    } else {
      container.innerHTML = `<a href="auth.html" class="login-link">Увійти</a>`;
    }

  } catch (error) {
    console.error("Не вдалося завантажити хедер:", error);
  }
});
