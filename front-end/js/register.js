'use strict';
console.log('register.js file was loaded');

// targets
const role = document.querySelector('#role');
const addItem = document.querySelector('#register-form');

fetch('http://localhost:3000/api/user_roles')
  .then((response) => response.json())
  .then((data) => {
    role.innerHTML = '';

    data.forEach((roleObj) => {
      const option = document.createElement('option');
      option.value = roleObj.user_role_id;
      option.textContent = roleObj.user_role_name;
      role.appendChild(option);
    });
  })
  .catch((error) => {
    console.error('Error fetching user roles:', error);
  });

addItem.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const roleId = document.querySelector('#role').value;
  const repeatPassword = document.querySelector('#repeatPassword').value;
  if (password !== repeatPassword) {
    console.warn('Passwords do not match');
    return;
  }

  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: name,
      user_email: email,
      user_password: password,
      role_id: roleId,
    }),
  });
  const data = await response.json();
  if (data.error || response.status === 500) {
    console.warn('Email already exists, please login');
  }
});
