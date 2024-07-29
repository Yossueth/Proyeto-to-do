// Obtener el formulario de registro por su ID
let signUpForm = document.getElementById("signUpForm");

// Agregar un manejador de eventos para el evento de envío del formulario
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la página)

  // Obtener los valores de los campos del formulario
  let name = document.getElementById("name").value; 
  let email = document.getElementById("email").value; 
  let password = document.getElementById("password").value; 

  // Validar la longitud de la contraseña
  if (password.length < 8) {
    return alert(
      "The password is too short. It must be at least 8 characters long."
    );
  }

  // Verificar que la contraseña no contenga caracteres especiales
  let caracteres = /[^a-zA-Z0-9]/; // Expresión regular para detectar caracteres especiales
  if (caracteres.test(password)) {
    return alert("The password should not contain special characters.");
  }

  // Obtener la lista de usuarios almacenada en localStorage, o usar un array vacío si no existe
  let userList = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar si ya existe un usuario registrado con el mismo correo electrónico
  let userRegister = userList.find((user) => user.email === email);

  if (userRegister) {
    return alert("A user with that email address is already registered 😭");
  }

  // Agregar el nuevo usuario a la lista
  userList.push({ name: name, email: email, password: password });

  // Almacenar la lista actualizada de usuarios en localStorage
  localStorage.setItem("users", JSON.stringify(userList));

  // Mostrar un mensaje de éxito y redirigir al usuario a la página de inicio de sesión
  alert("Registration successful 👌");
  window.location.href = "login.html";
});
