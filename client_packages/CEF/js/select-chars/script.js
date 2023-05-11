const API_URL = "http://localhost/ragemp-api";

document.addEventListener("DOMContentLoaded", () => {
  // form login
  const formLogin = document.querySelector("#form-login");

  document.querySelector("#username").value = mp.players.local.name;

  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(formLogin);

      const response = await callAPI("/auth/login.php", "POST", data);
      if (response.success === "success") {
        mp.trigger("OnPlayerSuccessLogin", response.data);
      } else {
        alert(response.message);
      }
    });
  }
});

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
