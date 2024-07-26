let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let userList = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = userList.find(
    (user) => user.email === email && user.password === password
  );
  if (!validUser) {
    return alert("Username and/or password are incorrect");
  }
  alert(`Welcome ${validUser.name}`);
  localStorage.setItem("userSession", JSON.stringify(validUser));
  window.location.href = "home.html";
});
