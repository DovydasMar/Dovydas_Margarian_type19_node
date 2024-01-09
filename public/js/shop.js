/* eslint-disable no-undef */
import { getDataFetch } from './modules/helper.js';

const itemUrl = 'http://localhost:3000/api/shop_items';
const delUrl = 'http://localhost:3000/api/shop_items';
const orderUrl = 'http://localhost:3000/api/orders';
const userUrl = 'http://localhost:3000/api/users';
const userEmail = localStorage.getItem('email');
const userRole = +localStorage.getItem('roleId');

const els = {
  cardContainer: document.getElementById('container'),
  addItem: document.getElementById('adminAdd'),
  authentication: document.getElementById('auth'),
  logout: document.getElementById('log'),
};
if (!userRole) {
  els.authentication.innerHTML = `
  <li class=""><a href="login.html">Log in</a></li>
  <li><a href="register.html">Register</a></li>`;
}

const [itemArr, error] = await getDataFetch(itemUrl);
const userioEmailas = { email: userEmail };
let userioId = '';
getUsersId(userioEmailas);

if (error) {
  // console.log(error);
}
if (Array.isArray(itemArr)) {
  renderCards(itemArr);
}
function renderCards(arr) {
  els.cardContainer.innerHTML = '';
  arr.map(makeOneCard).forEach((cardEl) => {
    els.cardContainer.append(cardEl);
  });
}

function deleteItem(e) {
  const btn = e.target;
  const cardEl = btn.parentElement;

  const idToUse = cardEl.dataset.id;

  fetch(`${delUrl}/${idToUse}`, {
    method: 'DELETE',
  })
    .then((resp) => {
      if (resp.status === 200) {
        cardEl.remove();
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
function buyItem(e) {
  const btn = e.target;
  const cardEl = btn.parentElement;
  const itemId = cardEl.dataset.id;
  const selectValue = cardEl.querySelector('input').value;
  const price = cardEl.querySelector('#price').textContent;
  const totalRice = selectValue * price;

  const bodyToOrder = {
    userId: Number(userioId),
    shopItemId: itemId,
    quantity: selectValue,
    totalPrice: totalRice,
    status: 'Order Placed',
  };

  addToCart(bodyToOrder);
}
function makeOneCard(itemObj) {
  const divEl = document.createElement('div');
  divEl.classList.add('card');
  divEl.dataset.id = itemObj.id;
  const divoEl = document.createElement('div');
  divoEl.classList.add('img-container');
  const imgEl = document.createElement('img');
  imgEl.src = itemObj.image;
  imgEl.alt = itemObj.name;
  const h1El = document.createElement('h2');
  h1El.textContent = itemObj.name;
  const pEl = document.createElement('h4');
  pEl.textContent = itemObj.description;
  const priceEl = document.createElement('p');
  priceEl.id = 'price';
  priceEl.textContent = itemObj.price;
  const buttonEl = document.createElement('button');
  buttonEl.classList.add('btn');
  buttonEl.textContent = 'Buy this product';
  const quantitySelect = document.createElement('input');
  quantitySelect.type = 'number';
  quantitySelect.step = '1';
  quantitySelect.min = '1';
  quantitySelect.value = '1';
  const buttonDelEl = document.createElement('button');
  buttonDelEl.textContent = 'Delete item';
  buttonDelEl.classList.add('btn');
  buttonDelEl.classList.add('danger');
  divoEl.append(imgEl);
  divEl.append(
    divoEl,
    h1El,
    pEl,
    priceEl,
    quantitySelect,
    buttonEl,
    buttonDelEl
  );
  buttonEl.addEventListener('click', buyItem);
  buttonDelEl.addEventListener('click', deleteItem);

  if (userRole !== 1) {
    buttonDelEl.remove();
  }
  return divEl;
}

if (userRole !== 1) {
  els.addItem.remove();
}

els.logout.addEventListener('click', () => {
  localStorage.removeItem('roleId');
  localStorage.removeItem('email');
  window.location.href = '/public/login.html';
});
function addToCart(body) {
  fetch(orderUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
    })
    .catch((err) => {
      console.warn('ivyko klaida:', err);
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
      userioId = data[0].userId;
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
