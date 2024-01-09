/* eslint-disable no-undef */
import { getDataFetch } from './modules/helper.js';
const addItemUrl = 'http://localhost:3000/api/shop_items';
const userEmail = localStorage.getItem('email');
const userRole = +localStorage.getItem('roleId');
const els = {
  form: document.forms[0],
  name: document.getElementById('name'),
  price: document.getElementById('price'),
  description: document.getElementById('description'),
  image: document.getElementById('image'),
  select: document.getElementById('itemTypeId'),
  errorList: document.getElementById('errors-list'),
  addItem: document.getElementById('adminAdd'),
  logout: document.getElementById('log'),
  authentication: document.getElementById('auth'),
};
if (!userRole) {
  els.authentication.innerHTML = `
  <li class=""><a href="login.html">Log in</a></li>
  <li><a href="register.html">Register</a></li>`;
}
if (userRole !== 1) {
  window.location.href = '/public/shop.html';
}

getTypeId();

async function getTypeId() {
  const [data, error] = await getDataFetch(
    'http://localhost:3000/api/item_types'
  );
  if (error) {
    return;
  }

  data.forEach((itemObj) => {
    const option = document.createElement('option');
    option.value = itemObj.typesId;
    option.textContent = itemObj.typesName;
    els.select.appendChild(option);
  });
}
els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const addItemBody = {
    name: els.name.value,
    price: els.price.value,
    description: els.description.value,
    image: els.image.value,
    itemTypeId: els.select.value,
  };
  sendAddItemFetch(addItemBody);
});
function sendAddItemFetch(itemObj) {
  fetch(addItemUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(itemObj),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      if (data === 'created') {
        window.location.href = '/public/shop.html';
      }
      setErrors(data);
    })
    .catch((error) => {
      console.warn(error);
    });
}
function setErrors(arr) {
  els.errorList.innerHTML = '';
  els.name.classList.remove('error');
  els.price.classList.remove('error');
  els.description.classList.remove('error');
  els.image.classList.remove('error');
  els.select.classList.remove('error');
  arr.forEach((errObj) => {
    document.getElementById(errObj.field).classList.add('error');
    const liEl = document.createElement('li');
    liEl.textContent = errObj.error;
    els.errorList.append(liEl);
  });
}
if (userRole !== 1) {
  els.addItem.remove();
}
els.logout.addEventListener('click', () => {
  localStorage.removeItem('roleId');
  localStorage.removeItem('email');
  window.location.href = '/public/login.html';
});
