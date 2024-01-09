/* eslint-disable no-use-before-define */
import { getDataFetch } from './modules/helper.js';

const regUrl = 'http://localhost:3000/api/auth/register';
const userEmail = localStorage.getItem('email');
const userRole = +localStorage.getItem('roleId');
const els = {
  form: document.forms[0],
  username: document.getElementById('userName'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  select: document.getElementById('roleId'),
  errorList: document.getElementById('errors-list'),
  addItem: document.getElementById('adminAdd'),
  authentication: document.getElementById('auth'),
  logout: document.getElementById('log'),
};

if (userRole) {
  window.location.href = '/public/shop.html';
}
if (!userRole) {
  els.authentication.innerHTML = `
  <li class=""><a href="login.html">Log in</a></li>
  <li><a href="register.html">Register</a></li>`;
}

getRoleId('http://localhost:3000/api/user_roles');

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log("pateikta");
  const regInput = {
    userName: els.username.value,
    email: els.email.value,
    password: els.password.value,
    roleId: els.select.value,
  };

  sendRegFetch(regInput);
});
function sendRegFetch(regObj) {
  fetch(regUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(regObj),
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      if (data === 'user created') {
        window.location.href = '/public/login.html';
      }
      setErrors(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
async function getRoleId() {
  const [data, error] = await getDataFetch(
    'http://localhost:3000/api/user_roles'
  );
  if (error) {
    return;
  }

  // loop over data
  data.forEach((userObj) => {
    const option = document.createElement('option');
    // set option value to userObj.id
    option.value = userObj.roleId;
    // set option text to userObj.title
    option.textContent = userObj.name;
    // append option to select element
    els.select.appendChild(option);
  });
}
function setErrors(arr) {
  els.errorList.innerHTML = '';
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
