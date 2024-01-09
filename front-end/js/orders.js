'use strict';
console.log('orders.js file was loaded');

// targets
const tableContainer = document.querySelector('#table_container');
const orderedBy = document.querySelector('#ordered_by');

orderedBy.addEventListener('change', () => {
  fetch('http://localhost:3000/api/orders')
    .then((response) => response.json())
    .then((data) => {
      let tableContent = '';

      data.forEach((orderObj) => {
        if (orderedBy.value === '' || orderObj.user_name === orderedBy.value) {
          tableContent += `<tr>
            <td>${orderObj.user_name}</td>
            <td>${orderObj.shop_item_name}</td>
            <td>${orderObj.shop_item_price}</td>
          </tr>`;
        }
      });

      tableContainer.innerHTML = tableContent;
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
    });
});

fetch('http://localhost:3000/api/orders')
  .then((response) => response.json())
  .then((data) => {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select an option';
    orderedBy.appendChild(defaultOption);

    const existingOptions = new Set();

    data.forEach((orderObj) => {
      if (!existingOptions.has(orderObj.user_name)) {
        const option = document.createElement('option');
        option.value = orderObj.user_name;
        option.textContent = orderObj.user_name;
        orderedBy.appendChild(option);

        existingOptions.add(orderObj.user_name);
      }
    });
  });

fetch('http://localhost:3000/api/orders')
  .then((response) => response.json())
  .then((data) => {
    tableContainer.innerHTML = '';

    data.forEach((orderObj) => {
      const oneOrder = `<tr>
    <td>${orderObj.user_name}</td>
    <td>${orderObj.shop_item_name}</td>
    <td>${orderObj.shop_item_price}</td>
  </tr>`;
      tableContainer.innerHTML += oneOrder;
    });
  })
  .catch((error) => {
    console.error('Error fetching orders:', error);
  });
