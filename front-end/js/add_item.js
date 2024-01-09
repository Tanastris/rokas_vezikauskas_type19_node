'use strict';
console.log('add_item.js file was loaded');

const addItem = document.querySelector('#add_item');
const itemType = document.querySelector('#item_type_id');
const navbar = document.querySelector('#navbar');

fetch('http://localhost:3000/api/item_types')
  .then((response) => response.json())
  .then((data) => {
    itemType.innerHTML = '';

    data.forEach((itemTypeObj) => {
      const option = document.createElement('option');
      option.value = itemTypeObj.item_type_id;
      option.textContent = itemTypeObj.item_type_name;
      itemType.appendChild(option);
    });
  })
  .catch((error) => {
    console.error('Error fetching item types:', error);
  });

addItem.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('#description').value;
  const image = document.querySelector('#image').value;

  const response = await fetch('http://localhost:3000/api/shop_items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shop_item_name: name,
      shop_item_price: price,
      shop_item_description: description,
      shop_item_image: image,
      item_type_id: itemType.value,
    }),
  });
  const data = await response.json();
  if (data.error) {
    console.warn('Something went wrong, please try again');
    return;
  }
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
