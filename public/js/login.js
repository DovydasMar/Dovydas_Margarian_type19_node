/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

const loginUrl = 'http://localhost:3000/api/auth/login';
const roleUrl = 'http://localhost:3000/api/user_roles';
const userEmail = localStorage.getItem('email');
const userRole = +localStorage.getItem('roleId');

const els = {
  form: document.forms[0],
  email: document.getElementById('email'),
  password: document.getElementById('password'),
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
if (userRole) {
  window.location.href = '/public/shop.html';
}

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
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
    .then((resp) => resp.json())
    .then((data) => {
      const emailObj = { email: loginObj.email };
      if (data.error === "username or password doesn't match") {
        setErrors(data);
      } else if (data.msg === 'isiloginai succ') {
        loginLocalStorage(emailObj);
      } else if (Array.isArray(data)) {
        setErrors(data);
      }
    })
    .catch((error) => {
      console.error('An error occurred during login:', error);
      setErrors([{ field: 'none', error: 'An error occurred during login' }]);
    });
}

function loginLocalStorage(email) {
  fetch(roleUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(email),
  })
    .then((resp) => resp.json())
    .then((data) => {
      const { email: userEmail, roleId } = data[0];
      localStorage.setItem('email', userEmail);
      localStorage.setItem('roleId', roleId);
      window.location.href = '/public/shop.html';
    })
    .catch((error) => {
      console.error('An error occurred during role retrieval:', error);
      setErrors([
        { field: 'none', error: 'An error occurred during role retrieval' },
      ]);
    });
}

function setErrors(arr) {
  els.errorList.innerHTML = '';

  arr.forEach((errObj) => {
    const fieldElement = document.getElementById(errObj.field);

    if (fieldElement) {
      fieldElement.classList.add('error');
    }

    const liEl = document.createElement('li');
    liEl.textContent = errObj.error;
    els.errorList.append(liEl);
  });
}

if (userRole !== 1 || !userRole) {
  els.addItem.remove();
}

els.logout.addEventListener('click', () => {
  localStorage.removeItem('roleId');
  localStorage.removeItem('email');
  window.location.href = '/public/login.html';
});
