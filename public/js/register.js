/* eslint-disable no-use-before-define */
import { getDataFetch } from './modules/helper.js';

console.log('register.js file was loaded');
const regUrl = 'http://localhost:3000/api/auth/register';

const els = {
  form: document.forms[0],
  username: document.getElementById('userName'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  select: document.getElementById('user'),
  errorList: document.getElementById('errors-list'),
};
console.log('els ===', els);

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
  console.log('regInput ===', regInput);
  sendRegFetch(regInput);
});
function sendRegFetch(regObj) {
  fetch(regUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(regObj),
  })
    .then((resp) => {
      console.log('resp ===', resp);
      return resp.json();
    })
    .then((data) => {
      console.log('data ===', data);
      if (data === 'user created') {
        window.location.href = '/public/shop.html';
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
    console.log('error ===', error);
    return;
  }
  console.log('data ===', data);
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
    const liEl = document.createElement('li');
    liEl.textContent = errObj.error;
    els.errorList.append(liEl);
  });
}
