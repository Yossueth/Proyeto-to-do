// Obtener el formulario de inicio de sesión por su ID
let loginForm = document.getElementById("loginForm");

// Agregar un manejador de eventos para el evento de envío del formulario
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la página)

  // Obtener los valores de los campos del formulario
  let email = document.getElementById("email").value; 
  let password = document.getElementById("password").value; 

  // Obtener la lista de usuarios almacenada en localStorage, o usar un array vacío si no existe
  let userList = JSON.parse(localStorage.getItem("users")) || [];

  // Verificar si el usuario con el correo electrónico y contraseña ingresados existe en la lista
  let validUser = userList.find(
    (user) => user.email === email && user.password === password
  );

  // Si no se encuentra un usuario válido, mostrar una alerta
  if (!validUser) {
    return alert("Username and/or password are incorrect");
  }

  // Si el usuario es válido, mostrar un mensaje de bienvenida
  alert(`Welcome ${validUser.name}`);

  // Almacenar la sesión del usuario en localStorage
  localStorage.setItem("userSession", JSON.stringify(validUser));

  // Redirigir al usuario a la página de inicio (home.html)
  window.location.href = "home.html";
});
