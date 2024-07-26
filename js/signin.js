let signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let userList = JSON.parse(localStorage.getItem("users")) || [];
  let userRegister = userList.find((user) => user.email === email);

  if (userRegister) {
    return alert("There is already a registered user with that email 😭");
  }
  userList.push({ name: name, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(userList));
  alert("Sign up successful 👌");
  window.location.href = "login.html";
});