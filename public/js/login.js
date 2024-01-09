/* eslint-disable no-undef */
console.log('login.js file was loaded');
const loginUrl = 'http://localhost:3000/api/auth/login';
const roleUrl = 'http://localhost:3000/api/user_roles';
const els = {
  form: document.forms[0],
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  errorList: document.getElementById('errors-list'),
};
console.log('els ===', els);

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log("pateikta");
  const loginInput = {
    email: els.email.value,
    password: els.password.value,
  };
  sendLoginFetch(loginInput);
});

function sendLoginFetch(loginObj) {
  fetch(loginUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(loginObj),
  })
    .then((resp) => {
      console.log('resp ===', resp);
      return resp.json();
    })
    .then((data) => {
      console.log('data ===', data);
      const emailObj = { email: loginObj.email };

      if (data.msg === 'isiloginai succ') {
        loginLocalStorage(emailObj);
      }
      if (Array.isArray(data)) {
        console.log('klaida');
        setErrors(data);
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
function loginLocalStorage(email) {
  fetch(roleUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(email),
  })
    .then((resp) => {
      console.log('resp ===', resp);
      return resp.json();
    })
    .then((data) => {
      console.log('email obj ===', data);
      const { email: userEmail, roleId } = data[0];
      localStorage.setItem('email', userEmail);
      localStorage.setItem('roleId', roleId);
      window.location.href = '/public/shop.html';
    })
    .catch((error) => {
      console.log(error);
      els.errorList.innerHTML = '';
      const liEl = document.createElement('li');
      liEl.textContent = "username or password doesn't match";
      els.errorList.append(liEl);
    });
}
function setErrors(arr) {
  arr.forEach((errObj) => {
    els.errorList.innerHTML = '';
    const liEl = document.createElement('li');
    liEl.textContent = errObj.error;
    els.errorList.append(liEl);
  });
}
