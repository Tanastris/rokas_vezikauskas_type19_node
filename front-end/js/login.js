'use strict';
console.log('login.js file was loaded');
// targets

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_email: email, user_password: password }),
  });
  const data = await response.json();
  console.log('data ===', data);
  if (data.error) {
    console.warn(data.error);
    return;
  }
  localStorage.setItem('token', data[0].token);
  window.location.href = 'http://127.0.0.1:5500/front-end/shop.html';
});
