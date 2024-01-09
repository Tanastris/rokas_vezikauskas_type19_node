'use strict';
console.log('shop.js file was loaded');

const cardsContainer = document.querySelector('.cards-container');

async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}

function makeOneItemCard(pObj) {
  const card = document.createElement('div');

  card.classList.add('card');
  card.innerHTML = `<div id="card${pObj.shop_item_id}" class="card">
  <img
    id="card-img${pObj.shop_item_id}"
    
    alt="${pObj.shop_item_image}"
    class="card-img"
  />
  <div class="card-body">
    <h3 class="card-title">${pObj.shop_item_name}</h3>
    <p id="card-description" class="card-description">${pObj.shop_item_description}</p>
    <p id="card-price" class="card-price">${pObj.shop_item_price}</p>
    <button class="card-button">Add to Cart</button>
    <button class="delete-button">Delete item</button>
  </div>
</div>`;
  const btnEl = card.querySelector('.delete-button');
  btnEl.addEventListener('click', (event) => {
    deleteItem(event, pObj.shop_item_id);
  });
  const cartEl = card.querySelector('.card-button');
  cartEl.addEventListener('click', (event) => {
    addToCart(event, pObj);
  });
  return card;
}

async function addToCart(event, obj) {
  const card = event.target.parentElement.parentElement;
  const itemId = obj.shop_item_id;
  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1,
        shop_item_id: itemId,
        quantity: 1,
        total_price: obj.shop_item_price,
        status: 'ready to ship',
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to add item. Status: ${response.status}`);
    }
    console.log('Item added successfully');
  } catch (error) {
    console.error('Error adding item:', error);
  }
}

async function deleteItem(event, id) {
  const card = event.target.parentElement.parentElement;
  const itemId = id;

  try {
    const response = await fetch(
      `http://localhost:3000/api/shop_items/${itemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete item. Status: ${response.status}`);
    }

    card.remove();

    console.log('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

function renderItemsList(arr) {
  cardsContainer.innerHTML = '';

  arr.forEach((itemObj) => {
    const card = makeOneItemCard(itemObj);

    cardsContainer.append(card);
  });
}

(async () => {
  try {
    const dataArray = await getDataFetch(
      'http://localhost:3000/api/shop_items'
    );
    console.log('Data Array:', dataArray);
    if (dataArray[1] !== null) {
      throw dataArray[1];
    }
    console.log('dataArray[0] ===', dataArray[0]);
    renderItemsList(dataArray[0]);
  } catch (error) {
    console.error('Error:', error);
  }
})();
