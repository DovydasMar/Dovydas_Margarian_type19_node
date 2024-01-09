/* eslint-disable no-undef */
import { getDataFetch } from './modules/helper.js';

const itemUrl = 'http://localhost:3000/api/shop_items';
const delUrl = 'http://localhost:3000/api/shop_items';
const orderUrl = 'http://localhost:3000/api/orders';
const userEmail = localStorage.getItem('email');
const userRole = localStorage.getItem('roleId');
console.log('userRole ===', userRole);
const els = {
  cardContainer: document.getElementById('container'),
};
console.log('els ===', els);
const [itemArr, error] = await getDataFetch(itemUrl);

if (error) {
  // show error
}
if (Array.isArray(itemArr)) {
  console.log('itemArr ===', itemArr);
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
  console.log('cardEl ===', cardEl);
  const idToUse = cardEl.dataset.id;
  console.log('idToUse ===', idToUse);
  console.log('item deleted');
  fetch(`${delUrl}/${idToUse}`, {
    method: 'DELETE',
  })
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 200) {
        console.log('istrinta sekmingai');
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
  console.log('cardEl ===', cardEl);
  const idToUse = cardEl.dataset.id;
  console.log('idToUse ===', idToUse);
  console.log('item added to cart');
}
function makeOneCard(itemObj) {
  const divEl = document.createElement('div');
  divEl.classList.add('card');
  divEl.dataset.id = itemObj.id;
  const imgEl = document.createElement('img');
  imgEl.src = itemObj.image;
  imgEl.alt = itemObj.name;
  const h1El = document.createElement('h1');
  h1El.textContent = itemObj.name;
  const pEl = document.createElement('p');
  pEl.textContent = itemObj.description;
  const priceEl = document.createElement('p');
  priceEl.textContent = itemObj.price;
  const buttonEl = document.createElement('button');
  buttonEl.textContent = 'Buy this product';
  const buttonDelEl = document.createElement('button');
  buttonDelEl.textContent = 'Delete item';
  divEl.append(imgEl, h1El, pEl, priceEl, buttonEl, buttonDelEl);
  buttonEl.addEventListener('click', buyItem);
  buttonDelEl.addEventListener('click', deleteItem);
  console.log('userRole ===', userRole);
  if (userRole !== '1') {
    buttonDelEl.remove();
  }
  return divEl;
}
