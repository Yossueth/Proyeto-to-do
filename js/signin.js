let signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Validar contraseña
  if (password.length < 8) {
    return alert(
      "The password is too short. It must be at least 8 characters long."
    );
  }

  // Verificar que la contraseña no contenga caracteres especiales
  let caracteres = /[^a-zA-Z0-9]/;
  if (caracteres.test(password)) {
    return alert("The password should not contain special characters.");
  }

  let userList = JSON.parse(localStorage.getItem("users")) || [];
  let userRegister = userList.find((user) => user.email === email);

  if (userRegister) {
    return alert(
      "A user with that email address is already registered 😭"
    );
  }

  userList.push({ name: name, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(userList));
  alert("Registration successful 👌");
  window.location.href = "login.html";
});
