/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { getDataFetch } from './modules/helper.js';

const orderUrl = 'http://localhost:3000/api/orders';
const userUrl = 'http://localhost:3000/api/users';
const userEmail = localStorage.getItem('email');
const userRole = +localStorage.getItem('roleId');

const els = {
  table: document.getElementById('table'),
  select: document.getElementById('userId'),
  addItem: document.getElementById('adminAdd'),
  logout: document.getElementById('log'),
  authentication: document.getElementById('auth'),
};

if (!userRole) {
  els.authentication.innerHTML = `
  <li class=""><a href="login.html">Log in</a></li>
  <li><a href="register.html">Register</a></li>`;
}

const userioEmailas = { email: userEmail };

if (!userRole) {
  els.table.textContent = 'to see your order list, please register or login';
  els.select.remove();
} else if (userRole !== 1) {
  getUsersId(userioEmailas);
  els.select.remove();
} else if (userRole === 1) {
  getUsers();
  getOrders();
}

function renderTable(data) {
  els.table.innerHTML = `
    <tr>
      <th>order ID</th>
      <th>user</th>
      <th>Item</th>
      <th>quantity</th>
      <th>total price</th>
      <th>status</th>
    </tr>`;

  data.forEach((oObj) => {
    const tableRow = document.createElement('tr');
    const orderData = document.createElement('td');
    orderData.textContent = oObj.orderId;
    const userData = document.createElement('td');
    userData.textContent = oObj.userName;
    const itemData = document.createElement('td');
    itemData.textContent = oObj.name;
    const quantityData = document.createElement('td');
    quantityData.textContent = oObj.quantity;
    const priceData = document.createElement('td');
    priceData.textContent = oObj.totalPrice;
    const statusData = document.createElement('td');
    statusData.textContent = oObj.status;

    tableRow.append(
      orderData,
      userData,
      itemData,
      quantityData,
      priceData,
      statusData
    );

    els.table.appendChild(tableRow);
  });
}

els.select.addEventListener('change', () => {
  const userId = els.select.value;

  getSingleOrders(userId);
});

async function getOrders() {
  const [data, error] = await getDataFetch(orderUrl);
  if (error) {
    return;
  }
  renderTable(data);
}

async function getSingleOrders(id) {
  const [data, error] = await getDataFetch(`${orderUrl}/user/${id}`);
  if (error) {
    return;
  }
  renderTable(data);
}

if (userRole !== 1) {
  els.addItem.remove();
}

async function getUsers() {
  const [data, error] = await getDataFetch(userUrl);
  if (error) {
    return;
  }
  data.forEach((userObj) => {
    const option = document.createElement('option');
    option.value = userObj.userId;
    option.textContent = userObj.userName;
    els.select.appendChild(option);
  });
}

function getUsersId(email) {
  fetch(userUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(email),
  })
    .then((resp) => resp.json())
    .then((data) => {
      getSingleOrders(data[0].userId);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
els.logout.addEventListener('click', () => {
  localStorage.removeItem('roleId');
  localStorage.removeItem('email');
  window.location.href = '/public/login.html';
});
