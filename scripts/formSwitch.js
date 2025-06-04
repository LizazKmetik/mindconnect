function showForm(formType) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('registerForm').classList.remove('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerTab').classList.remove('active');

    if (formType === 'login') {
      document.getElementById('loginForm').classList.add('active');
      document.getElementById('loginTab').classList.add('active');
    } else {
      document.getElementById('registerForm').classList.add('active');
      document.getElementById('registerTab').classList.add('active');
    }
  }