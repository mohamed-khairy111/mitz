const baseURL = 'https://tarmeezacademy.com/api/v1';

axios.get(`${baseURL}/posts?limit=2`).then((response) => {
  const posts = response.data.data;
  document.getElementById('cards').innerHTML = '';
  for (p of posts) {
    console.log(p);
    const author = p.author;
    let content = ` <div class="card">
              <div class="card-header">
                <img
                  class="rounded-circle border border-2"
                  src="${author.profile_image}"
                  alt=""
                  style="width: 40px; height: 40px"
                />
                <b>${author.username}</b>
              </div>
              <div class="card-body">
                <img
                  class="w-100 rounded"
                  src="${p.image}"
                  alt=""
                />
                <h6 class="mt-1" style="color: rgb(193, 193, 193)">${p.created_at}</h6>
                <h5>${p.title}</h5>
                <p>
                  ${p.body}
                </p>
                <hr />

                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pen"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                    />
                  </svg>

                  <span> ${p.comments_count} comments </span>
                </div>
              </div>
            </div>`;

    document.getElementById('cards').innerHTML += content;
  }
});

function loginBtnClicked() {
  const username = document.getElementById('username-input').value;
  const password = document.getElementById('password-input').value;

  const params = {
    username: username,
    password: password,
  };

  const url = `${baseURL}/login`;
  axios.post(url, params).then((response) => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    const modal = document.getElementById('login-modal');
    const modalInstance = bootstrap.Modal.getInstance(modal);

    modalInstance.hide();
  });
}

function showSuccessAlert() {
  const alertPlaceholder = document.getElementById('success-alert');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');

    alertPlaceholder.append(wrapper);
  };

  const alertTrigger = document.getElementById('liveAlertBtn');
  if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
      appendAlert('Nice, you triggered this alert message!', 'success');
    });
  }
}

function setupUI() {
  const token = localStorage.getItem('token');

  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');

  if (token == null) {
    // user is guest not logged in
  } else {
    loginBtn.style.visibility = 'hidden';
    registerBtn.style.visibility = 'hidden';
  }
}

setupUI();
