const API_URL = "http://localhost/ragemp-api";

document.addEventListener("DOMContentLoaded", () => {
  // form login
  const btnLogin = document.querySelector("#btn-login");

  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    mp.trigger(
      "OnPlayerLogin",
      document.querySelector("#username").value,
      document.querySelector("#password").value
    );
  });
});

const appendAlert = (message, type, parentEl) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  parentEl.append(wrapper);
};

const showError = (message) => {
  const error = document.querySelector("#error");
  appendAlert(message, "danger", error);
};

const callAPI = (endpoint, method, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${API_URL}${endpoint}`);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(data);
  });
};
