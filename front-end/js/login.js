'use strict';
console.log('login.js file was loaded');
// targets

const loginForm = document.querySelector('#login-form');
const navbar = document.querySelector('#navbar');

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
  console.log(data);
  localStorage.setItem(
    'loggedInUser',
    JSON.stringify({
      userLogged: data[0].user_email,
      userRole: data[0].role_id,
    })
  );
  window.location.href = 'http://127.0.0.1:5500/front-end/shop.html';
});
if (localStorage.getItem('loggedInUser')) {
  const logoutButtonLi = document.createElement('li');
  logoutButtonLi.innerHTML = '<a id = "logout_button">Logout</a>';
  logoutButtonLi.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'http://127.0.0.1:5500/front-end/login.html';
  });
  navbar.appendChild(logoutButtonLi);
}
