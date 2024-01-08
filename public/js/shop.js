import { getDataFetch } from './modules/helper.js';

const itemUrl = 'http://localhost:3000/api/shop_items';
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
els.cardContainer.append(divElArr);

function deleteItem() {
  console.log('Item deleted');
}
function buyItem() {
  console.log('item added to cart');
}
function makeOneCard(itemObj) {
  const divEl = document.createElement('div');
  divEl.classList.add('card');
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

  return divEl;
}
